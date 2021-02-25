const gql = require("graphql-tag");

module.exports = gql`
  type Auditor {
    auditorId: String!
    name: String!
    email: String!
    tenants: [String]!
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
      register(registerInput: RegisterInput): User!
      login(username: String!, password: String!): User!
  }
`;

//RegisterInput : currently has 4 fields, but yet to decide on the way that registration should work
