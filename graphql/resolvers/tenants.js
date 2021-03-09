const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");

const {
  validateRegisterInput,
  validateLoginInput,
  validateCreateInput,
} = require("../../util/validators");

dotenv.config();
const Tenant = require("../../models/Tenant");

// takes in a user as the input and tokenizes the attribute
function generateToken(tenant) {
  return jwt.sign(
    {
      id: tenant._id,
      name: tenant.name
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getAllTenants() {
      try {
        const Tenants = await Tenant.find();
        return Tenants;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async loginTenant(_, { email, password }) {
      const { errors, valid } = validateLoginInput(email, password); // checks whether input is empty
      if (!valid) {
        throw new UserInputError("Errors", { errors }); // throw error if input is empty
      }
      const tenant = await Tenant.findOne({email }); // mongoose call to find tenant by email
      if (!tenant) {
        errors.general = "Tenant not found";
        throw new UserInputError("Tenant not found", { errors }); // throw error if user not found
      }
      console.log("Tenant ID is : ", tenant._id)
      const match = await bcrypt.compare(password, tenant.password); // compare the value of the hashed password
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Wrong crendetials", { errors }); //passwords do not match
      }
      const token = generateToken(tenant); // generates token upon successful verification
      return {
        ...tenant._doc, //basically show everything?
        id: tenant._id,
        token,
      };
    },

    async registerTenant(
      _,
      { registerInput: { regToken, email, password, confirmPassword } }
    ) {
      // Validate user data by checking whether email is empty, valid , and whether passwords match
      const { valid, errors } = validateRegisterInput(email,password,confirmPassword);

      if (!valid) {throw new UserInputError("Errors", { errors });}
      
      password = await bcrypt.hash(password, 12);

      var decoded = jwt.verify(regToken, process.env.SECRET_KEY);

      console.log(decoded.id);

      const tenantUpdates = {
        email: email,
        password: password,
        activated: true
      };

      // Makes sure email doesnt already exist in the database
      const tenant = await Tenant.findOneAndUpdate({_id: decoded.id},tenantUpdates,{new: true}); 

      if (!tenant) { // if no tenant found in database
        throw new UserInputError("no tenant found taken", {
          errors: {
            email: "no tenant found is taken",
          },
        });
      }

      // hash password and create an auth token
      const token = generateToken(tenant);

      return {
        ...tenant._doc, //basically show everything?
        id: tenant._id,
        token,
      };
    },

    async createTenant(
      _,
      { name, institution  }
    ) {
      // Validate user data by checking whether email is empty, valid , and whether passwords match
      const { valid, errors } = validateCreateInput(
        name,
        institution
      );

      if (!valid) { // ensure that 
        throw new UserInputError("Errors", { errors });
      }
      // Makes sure email doesnt already exist in the database
      const tenant = await Tenant.findOne({ name }); //'findone' to go to mongodb to check
      if (tenant) { // if tenant found in database
        throw new UserInputError("name is already taken", {
          errors: {
            name: "This name is taken",
            id: "This email is taken",
          },
        });
      }


      const newUser = new Tenant({
        name,
        institution,
        email: "",
        password: "",
        createdAt: new Date().toISOString(),
        activated: false
      });

      const res = await newUser.save();

      const token = generateToken(res)

      return {
        ...res._doc,
        id: res._id,
        token
      };
    },
  },
};
