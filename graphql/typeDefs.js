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
    type: String!
    email: String!
    password: String!
    createdAt: String!
    activated: String!
    token: String
  }

  type Query {
    getAllAuditors: [Auditor]
    getAuditorsByInstitution(institution: String!): [Auditor]
    getAuditorByEmail(email: String!): Auditor
    getAuditorById(id: String!): Auditor
    getAllTenants: [Tenant]
    getTenantsByInstitution(institution: String!): [Tenant]
    getTenantsByAuditor(auditorId: String!): [Tenant]
    getTenantByEmail(emailadd: String!): Tenant
    getTenantById(id: String!): Tenant
  }

  input CreateAuditorInput {
    name: String!
    institution: String!
    role: String!
  }

  input CreateTenantInput {
    name: String!
    institution: String!
    role: String!
    types: [String!]
  }

  input RegisterInput {
    regToken: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  type Mutation {
    createAuditor(createAuditorInput: CreateAuditorInput): Auditor!
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(email: String!, password: String!): Auditor!
    createTenant(createTenantInput: CreateTenantInput): Tenant!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(email: String!, password: String!): Tenant!
  }
`;

//RegisterInput : 2 inputs because only email and name is already created and stored by the creator
