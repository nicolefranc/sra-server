const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const dotenv = require("dotenv");

const {
  validateRegisterInput,
  validateLoginInput,
  validateCreateTenantInput,
} = require("../../util/validators");

dotenv.config();
const Tenant = require("../../models/Tenant");
const Auditor = require("../../models/Auditor");
const sendRegistrationEmail = require('../../emails/registrationEmail')

// takes in a user as the input and tokenizes the attribute
function generateToken(tenant) {
  return jwt.sign(
    {
      id: tenant._id,
      name: tenant.name,
      type: "tenant",
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
    async getTenantsByInstitution(_, institution) {
      try {
        console.log(institution);
        const Tenants = await Tenant.find(institution);
        return Tenants;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTenantsByAuditor(_, req) {
      try {
        console.log(req.auditorId);
        const Auditors = await Auditor.findOne({ _id: req.auditorId });
        try {
          const Tenants = await Tenant.find({
            institution: { $in: Auditors.institutions },
          });
          return Tenants;
        } catch (err) {
          throw new Error(err);
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTenantById(_, req) {
      try {
        const Tenants = await Tenant.findOne({ _id: req.id });
        return Tenants;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getTenantByEmail(_, req) {
      try {
        const Tenants = await Tenant.findOne({ email: req.email });
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
      const tenant = await Tenant.findOne({ email }); // mongoose call to find tenant by email
      if (!tenant) {
        errors.general = "Tenant not found";
        throw new UserInputError("Tenant not found", { errors }); // throw error if user not found
      }
      console.log("Tenant ID is : ", tenant._id);
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

      const tenantUpdates = {
        password: password,
        activated: true,
      };

      // Makes sure email doesnt already exist in the database
      const tenant = await Tenant.findOneAndUpdate(
        { _id: decoded.id },
        tenantUpdates,
        { new: true }
      );

      if (!tenant) {
        // if no tenant found in database
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

    async createTenant(_, {createTenantInput: { name, email, institution, type }}) {
      // Validate user data by checking whether email is empty, valid , and whether passwords match
      console.log({ name, email, institution, type });
      const { valid, errors } = validateCreateTenantInput(name, email, institution, type);

      if (!valid) {
        // ensure that
        throw new UserInputError("Errors", { errors });
      }
      // Makes sure name doesnt already exist in the database
      const tenant1 = await Tenant.findOne({ name }); //'findone' to go to mongodb to check
      if (tenant1) {
        // if tenant1 found in database
        throw new UserInputError("name is already taken", {
          errors: {
            name: "This name is taken",
            id: "This email is taken",
          },
        });
      }
      const tenant2 = await Tenant.findOne({ email }); //'findone' to go to mongodb to check
      if (tenant2) {
        // if tenant found in database
        throw new UserInputError("email is already taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      const newUser = new Tenant({
        name,
        email,
        institution,
        type,
        password: "",
        createdAt: new Date().toISOString(),
        activated: false,
      });

      const res = await newUser.save();

      const token = generateToken(res);

      sendRegistrationEmail("currentixer@gmail.com", token);
      // sendRegistrationEmail(email, token);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
