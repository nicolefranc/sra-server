const { model, Schema } = require('mongoose');

const reportTemplateSchema = new Schema({
    templateType: String,
    tenantId:  { type: String, default: '' },
    // TODO: Remove default, change to actual auditor Id
    auditorId:  { type: String, default: '' },
    auditDate:  { type: String, default: Date.now },
    auditScore: { type: Number, default: 0 },
    extension: {
        proposed: {
            date: { type: String, default: '' },
            remarks: { type: String, default: '' }
        },
        final: {
            date: { type: String, default: '' },
            remarks: { type: String, default: '' }
        },
        status: { type: String, default: '' }
    },
    checklist: [{
        category: String,
        weightage: Number,
        score: Number,
        subcategories: [{
            subcategory: String,
            subcatScore: { type: Number, default: 100 },
            lineItems: [{
                lineItem: String,
                complied: { type: Boolean, default: true },
                images: [{
                    nonCompliances: { type: [String], default: [] },
                    nonComplRemarks: { type: String, default: '' },
                    rectifications: { type: [String], default: [] },
                    rectRemarks: { type: String, default: '' }
                }]
            }]
        }]
    }]
});

module.exports = model('ReportTemplate', reportTemplateSchema, 'reportTemplates');