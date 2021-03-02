const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
    username: String!
    email: String!
    password: String!
    createdAt: String!
  }
  type Tenant {
    tenantId: String!
    name: String!
    email: String!
    password: String!
    token: Sring!
    createdAt: String!
  }
  type Query {
    getAllAuditors: [Auditor]
  }
  input RegisterInput {
    password: String!
    confirmPassword: String!
  }
  type Mutation {
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(username: String!, password: String!): Auditor!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(username: String!, password: String!): Tenant!
  }

`;

//RegisterInput : 2 inputs because only email and name is already created and stored by the creator
