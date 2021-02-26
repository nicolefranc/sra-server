const auditorsResolvers = require('./auditors');

module.exports = {
    Query: {
        ...auditorsResolvers.Query
    },
    Mutation: {
        ...auditorsResolvers.Mutation
    }
}