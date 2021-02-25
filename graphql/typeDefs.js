const gql = require('graphql-tag');

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
    
`