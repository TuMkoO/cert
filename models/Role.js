const { Schema, model } = require("mongoose");

const schema = new Schema({
  value: { type: String, required: true, unique: true, default: "user" },
});

module.exports = model("Role", schema);
