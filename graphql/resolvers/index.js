const auditorsResolvers = require('./auditors');
const tenantResolvers = require('./tenants');

module.exports = {
    Query: {
        ...auditorsResolvers.Query,
        ...tenantResolvers.Query
    },
    Mutation: {
        ...auditorsResolvers.Mutation,
        ...tenantResolvers.Mutation
    }
}