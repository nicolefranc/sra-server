const auditorsResolvers = require('./auditors');
const tenantResolvers = require('./tenants');
const reportsResolvers = require('./reports');

module.exports = {
    Query: {
        ...auditorsResolvers.Query,
        ...tenantResolvers.Query,
        ...reportsResolvers.Query
    },
    Mutation: {
        ...auditorsResolvers.Mutation,
        ...tenantResolvers.Mutation,
        ...reportsResolvers.Mutation
    }
}