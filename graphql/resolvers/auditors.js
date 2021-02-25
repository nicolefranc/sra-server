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
        },
        async getAuditorById(_, { auditorId }) {
            try {
                const auditor = await Auditor.findOne({ auditorId: auditorId });
                if (auditor) {
                    return auditor;
                } else {
                    throw new Error('Auditor not found.');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    }
}