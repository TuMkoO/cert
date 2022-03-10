const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  brand: { type: String, required: true },
  link: { type: String, required: true },
  footer: { type: Object, required: true },
});

module.exports = model("System", schema);
