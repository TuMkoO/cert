const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  certType: { type: String, required: true },

  date: { type: Date, default: Date.now },
  numProtocol: { type: String, required: true },
  numCertificate: { type: String, required: true },
  textHead: { type: String, required: true },

  firstname: { type: String, required: true },
  secondname: { type: String, required: true },
  lastname: { type: String, required: true },
  birthday: { type: Date, required: true },
  passport: { type: String, required: true },
  numOldCert: { type: String },
  dateOldCert: { type: Date },

  work: { type: String, required: true },
  workYears: { type: String, required: true },
  qualifyingRank: { type: String, required: true },
  attestationType: { type: String, required: true },

  stigma: { type: Array, required: true },
  stigmaGeneral: { type: String, required: true },
  weldingMethod: { type: Array, required: true },
  weldedType: { type: Array, required: true },
  weldedSeam: { type: Array, required: true },
  weldedConnection: { type: Array, required: true },
  weldedPosition: { type: Array, required: true },

  preheating: { type: Array },
  heatTreatment: { type: Array },
  axesPosition: { type: Array },
  weldedJoint: { type: Array },

  brand: { type: Array, required: true },
  thickness: { type: Array, required: true },
  diameter: { type: Array, required: true },

  electrode: { type: Array, required: true },
  flux: { type: Array, required: true },

  controls: { type: Array, required: true },
  accesses: { type: Array, required: true },

  npa: { type: String, required: true },
  grade: { type: String, required: true },
  decision: { type: String, required: true },

  expiration: { type: Date, required: true },

  comission: { type: Array, required: true },

  weldingMethodScope: { type: String, required: true },
  weldedTypeScope: { type: Array, required: true },
  weldedSeamScope: { type: Array, required: true },
  weldedConnectionScope: { type: Array, required: true },
  weldedPositionScope: { type: Array, required: true },
  axesPositionScope: { type: Array, required: true },
  weldedJointScope: { type: Array, required: true },
  brandScope: { type: Array, required: true },
  electrodeScope: { type: Array, required: true },
  auxiliaryScope: { type: String, required: true },
  thicknessScope: { type: String, required: true },
  diameterScope: { type: String, required: true },
  fluxScope: { type: String, required: true },
});

module.exports = model("Certificate", schema);
