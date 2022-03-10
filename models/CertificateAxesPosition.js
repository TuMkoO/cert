const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  value: { type: String, required: true },
});

module.exports = model("CertAxesPosition", schema);
