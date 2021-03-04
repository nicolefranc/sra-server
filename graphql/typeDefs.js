const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
    auditorId: String,
    role: String!
    institutions: [String!]!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
  }

  type Tenant {
    tenantId: String!
    name: String!
    institution: String!
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
  }

  type Query {
    getAllAuditors: [Auditor]
    getAllTenants: [Tenant]
  }

  input CreateInput {
    id: String!
    name: String!
    institution: String!
  }

  input RegisterInput {
    regToken: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    createAuditor(createInput: CreateInput): Auditor!
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(email: String!, password: String!): Auditor!
    createTenant(createInput: CreateInput): Tenant!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(email: String!, password: String!): Tenant!
  }

`;

//RegisterInput : 2 inputs because only email and name is already created and stored by the creator
