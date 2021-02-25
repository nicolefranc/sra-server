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
    checklist: [{
        category: String,
        weightage: Number,
        subcategories: [{
            subcategory: String,
            subcatScore: Number,
            lineItems: [{
                lineItem: String,
                complied: Number,
                images: [{
                    nonCompliances: [String],
                    nonComplRemarks: String,
                    rectifications: [String],
                    rectRemarks: String
                }]
            }]
        }]
    }]
});

module.exports = model('ReportTemplate', reportTemplateSchema, 'reportTemplates');