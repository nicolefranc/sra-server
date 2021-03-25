const { Schema } = require("mongoose");

const imageSchema = new Schema({
    nonCompliances: { type: [String], default: [] },
    nonComplRemarks: { type: String, default: '' },
    rectifications: { type: [String], default: [] },
    rectRemarks: { type: String, default: '' }
});

module.exports = model('Image', imageSchema);