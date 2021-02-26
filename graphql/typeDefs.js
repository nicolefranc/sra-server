const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
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
    register(registerInput: RegisterInput): Auditor!
    login(username: String!, password: String!): Auditor!
  }
`;

//RegisterInput : currently has 4 fields, but yet to decide on the way that registration should work
