const { model, Schema } = require('mongoose');

const auditorSchema = new Schema({
    auditorId: String,
    name: String,
    email: String,
    tenants: [String],
});

module.exports = model('Auditor', auditorSchema);