const { model, Schema } = require('mongoose');

const reportTemplateSchema = new Schema({
    type: { type: String, required: true },
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
                }] // Images
            }] // Line Items
        }] // Subcategories
    }] // Checklist
});

module.exports = model('ReportTemplate', reportTemplateSchema, 'reportTemplates');