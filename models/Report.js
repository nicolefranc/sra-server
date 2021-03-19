const { model, Schema } = require('mongoose');

const reportSchema = new Schema({
    templateType: String,
    tenantId: String,
    auditorId: String,
    auditDate: String,
    auditScore: Number,
    extension: {
        proposed: {
            date: String,
            remarks: String
        },
        final: {
            date: String,
            remarks: String
        },
        status: Number
    },
    checklist: Array
});

module.exports = model('Report', reportSchema);