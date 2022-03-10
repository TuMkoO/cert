const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  value: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: "CertAccess" },
});

module.exports = model("CertAcessItem", schema);
