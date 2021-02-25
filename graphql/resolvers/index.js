const auditorsResolvers = require('./auditors');

module.exports = {
    Query: {
        ...auditorsResolvers.Query
    }
}