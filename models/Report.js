const { model, Schema, Types } = require('mongoose');

const reportSchema = new Schema({
    type: String,
    tenantId:  { type: String, default: '' },
    // TODO: Remove default, change to actual auditor Id
    auditorId:  { type: String, default: '' },
    auditDate:  { type: String, default: Date.now },
    auditScore: { type: Number, default: 100 },
    status: { type: String, default: 'audited' },
    extension: {
        proposed: {
            date: { type: String, default: null },
            remarks: { type: String, default: null }
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
                images: [ { type: Schema.Types.ObjectId, ref: 'Image', default: '' } ] // Images
            }] // Line Items
        }] // Subcategories
    }] // Checklist
});

module.exports = model('Report', reportSchema);