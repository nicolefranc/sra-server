const { model, Schema } = require('mongoose');

const reportTemplateSchema = new Schema({
    templateType: String,
    tenant: String,
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

module.exports = model('ReportTemplate', reportTemplateSchema, 'reportTemplates');