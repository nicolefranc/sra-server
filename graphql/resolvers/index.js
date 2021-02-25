const auditorsResolvers = require('./auditors');
const reportsResolvers = require('./reports');

module.exports = {
    Query: {
        ...auditorsResolvers.Query,
        ...reportsResolvers.Query
    }
}