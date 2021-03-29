const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");

const {
  validateRegisterInput,
  validateLoginInput,
  validateCreateAuditorInput,
} = require("../../util/validators");

dotenv.config();
const Auditor = require("../../models/Auditor");
const sendRegistrationEmail = require("../../emails/registrationEmail");

function generateToken(auditor) {
  return jwt.sign(
    {
      id: auditor._id,
      name: auditor.name,
      type: auditor.role,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getAllAuditors() {
      try {
        const Auditors = await Auditor.find();
        return Auditors;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAuditorsByInstitution(_,{institution}) {
      try {
        const Auditors = await Auditor.find({ institution: institution });
        return Auditors;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAuditorByEmail(_,{email}) {
      try {
        const Auditors = await Auditor.findOne({ email: email });
        return Auditors;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAuditorById(_,{id}) {
      try {
        const Auditors = await Auditor.findOne({_id: id });
        return Auditors;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async loginAuditor(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password); // checks whether input is empty
      if (!valid) {
        throw new UserInputError("Errors", { errors }); // throw error if input is empty
      }
      const auditor = await Auditor.findOne({ email }); // mongoose call to find auditor by email
      if (!auditor) {
        errors.general = "Auditor does not exist";
        throw new UserInputError("Auditor not found", { errors }); // throw error if user not found
      }
      console.log(auditor.id);
      const match = await bcrypt.compare(password, auditor.password); // compare the value of the hashed password
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors }); //passwords do not match
      }
      const token = generateToken(auditor); // generates token upon successful verification
      return {
        ...auditor._doc, //basically show everything?
        id: auditor._id,
        token,
      };
    },

    async registerAuditor(
      _,
      { registerInput: { regToken, password, confirmPassword } }
    ) {
      // Validate user data by checking whether email is empty, valid , and whether passwords match
      const { valid, errors } = validateRegisterInput(
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      password = await bcrypt.hash(password, 12);

      var decoded = jwt.verify(regToken, process.env.SECRET_KEY);

      console.log(decoded.id);

      const auditorUpdates = {
        password: password,
        activated: true,
      };

      // Makes sure id exists in the database
      const auditor = await Auditor.findOneAndUpdate(
        { _id: decoded.id },
        auditorUpdates,
        { new: true }
      );

      if (!auditor) {
        // if no auditor found in database
        throw new UserInputError("no auditor found", {
          errors: {
            email: "no auditor found",
          },
        });
      }

      // hash password and create an auth token
      const token = generateToken(auditor);

      return {
        ...auditor._doc, //basically show everything?
        id: auditor._id,
        token,
      };
    },

    async createAuditor(
      _,
      { createAuditorInput: { name, email, role, institution } }
    ) {
      // Validate user data by checking whether email is empty, valid , and whether passwords match
      const { valid, errors } = validateCreateAuditorInput(
        name,
        email,
        role,
        institution
      );

      if (!valid) {
        // ensure that
        throw new UserInputError("Errors", { errors });
      }
      // Makes sure email doesnt already exist in the database
      const auditor = await Auditor.findOne({ name }); //'findone' to go to mongodb to check
      if (auditor) {
        // if auditor found in database
        throw new UserInputError("name is already taken", {
          errors: {
            name: "This name is taken",
          },
        });
      }
      const auditor2 = await Auditor.findOne({ email }); //'findone' to go to mongodb to check
      if (auditor2) {
        // if auditor found in database
        throw new UserInputError("email is already taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      const newUser = new Auditor({
        name,
        role,
        institutions: [institution],
        email,
        password: "",
        createdAt: new Date().toISOString(),
        activated: false,
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
          name: newUser.name,
          type: newUser.role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
      );;

      sendRegistrationEmail(email,token);
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
