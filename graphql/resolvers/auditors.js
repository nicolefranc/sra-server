const Auditor = require('../../models/Auditor');

module.exports = {
    Query: {
        async getAllAuditors() {
            try {
                const auditors = await Auditor.find();
                return auditors;
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}