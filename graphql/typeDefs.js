const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
    username: String!
    password: String!
    email: String!
    createdAt: String!
  }
  type Tenant {
    username: String!
    password: String!
    email: String!
    createdAt: String!
  }
  type Query {
    getAllAuditors: [Auditor]
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    registerAuditor(registerInput: RegisterInput): Auditor!
    loginAuditor(username: String!, password: String!): Auditor!
    registerTenant(registerInput: RegisterInput): Tenant!
    loginTenant(username: String!, password: String!): Tenant!
  }

`;

//RegisterInput : currently has 4 fields, but yet to decide on the way that registration should work
