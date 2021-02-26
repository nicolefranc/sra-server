const { model, Schema } = require("mongoose");

const auditorSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model("Auditor", auditorSchema);
