const auditorsResolvers = require('./auditors');
const tenantResolvers = require('./tenants');

module.exports = {
    Query: {
        ...auditorsResolvers.Query
    },
    Mutation: {
        ...auditorsResolvers.Mutation,
        ...tenantResolvers.Mutation
    }
}