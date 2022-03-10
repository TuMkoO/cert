const { Schema, model } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  isActivated: { type: Boolean, default: true },
  activationLink: { type: String },
});

module.exports = model("User", schema);
