const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
    id: ID!
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
    id: ID!
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
    getAuditorsByInstitution(institution: String!): [Auditor]
    getTenantsByInstitution(institution: String!): [Tenant]
    getTenantsByAuditor(auditorId: String!): [Tenant]
    getAuditorByEmail(email: String!): Auditor
    getTenantByEmail(email: String!): Tenant
    getAuditorById(id: String!): Auditor
    getTenantById(id: String!): Tenant
  }

  input CreateInput {
    name: String!
    institution: String!
    role: String!
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
    createTenant(name: String!,institution:String!): Tenant!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(email: String!, password: String!): Tenant!
  }

`;

//RegisterInput : 2 inputs because only email and name is already created and stored by the creator
