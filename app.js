const express = require("express");
const cors = require("cors");
const config = require("config");
const cookieParser = require("cookie-parser");
// const path = require("path");
const mongoose = require("mongoose");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();
app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://edo.naks-donbass.ru",
  })
);

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/certificate", require("./routes/certificate.routes"));
app.use("/api/certificate-sub", require("./routes/certificateSub.routes"));
app.use(
  "/api/certificate-access",
  require("./routes/certificateAccess.routes")
);
app.use(
  "/api/certificate-access-item",
  require("./routes/certificateAccessItem.routes")
);
app.use(
  "/api/certificate-text-head",
  require("./routes/certificateTextHead.routes")
);
app.use(
  "/api/certificate-qualifying-rank",
  require("./routes/certificateQualifyingRank.routes")
);
app.use(
  "/api/certificate-attestation-type",
  require("./routes/certificateAttestationType.routes")
);

app.use("/api/certificate-brand", require("./routes/certificateBrand.routes"));
app.use(
  "/api/certificate-electrode",
  require("./routes/certificateElectrode.routes")
);
app.use(
  "/api/certificate-comission",
  require("./routes/certificateComission.routes")
);
app.use(
  "/api/certificate-control",
  require("./routes/certificateControl.routes")
);
app.use("/api/certificate-grade", require("./routes/certificateGrade.routes"));
app.use(
  "/api/certificate-welded-position",
  require("./routes/certificateWeldedPosition.routes")
);
app.use(
  "/api/certificate-welded-type",
  require("./routes/certificateWeldedType.routes")
);
app.use(
  "/api/certificate-welded-seam",
  require("./routes/certificateWeldedSeam.routes")
);
app.use(
  "/api/certificate-welded-connection",
  require("./routes/certificateWeldedConnection.routes")
);
app.use(
  "/api/certificate-welding-method",
  require("./routes/certificateWeldingMethod.routes")
);
app.use(
  "/api/certificate-axes-position",
  require("./routes/certificateAxesPosition.routes")
);
app.use(
  "/api/certificate-welded-joint",
  require("./routes/certificateWeldedJoint.routes")
);
app.use("/api/system", require("./routes/system.routes"));
app.use("/api/qr-code", require("./routes/qrCode.routes"));

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
}

const PORT = config.get("port") || 5000;
// const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
