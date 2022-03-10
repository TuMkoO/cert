const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  value: { type: String, required: true, unique: true },
  items: [{ type: Types.ObjectId, ref: "CertAcessItem" }],
});

module.exports = model("CertAccess", schema);
