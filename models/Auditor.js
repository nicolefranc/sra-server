const { model, Schema } = require("mongoose");

const auditorSchema = new Schema({
  name: String,
  role: String,
  institutions: [String],
  email: String,
  password: String,
  createdAt: String,
  activated: Boolean
});

module.exports = model("Auditor", auditorSchema, 'auditors');
