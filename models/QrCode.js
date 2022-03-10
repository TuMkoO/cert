const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  link: { type: String, required: true },
});

module.exports = model("QrCode", schema);
