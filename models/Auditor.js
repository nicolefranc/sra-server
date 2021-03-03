const { model, Schema } = require("mongoose");

const auditorSchema = new Schema({
  auditorId: String,
  name: String,
  institution: [String],
  email: String,
  password: String,
  createdAt: String,
  activated: Boolean
});

module.exports = model("Auditor", auditorSchema);
