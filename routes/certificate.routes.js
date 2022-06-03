const { Router } = require("express");
// const config = require("config");
const Certificate = require("../models/Certificate");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const {
        certType,
        date,
        numProtocol,
        textHead,
        firstname,
        secondname,
        lastname,
        birthday,
        passport,
        numOldCert,
        dateOldCert,
        work,
        workYears,
        qualifyingRank,
        attestationType,
        stigma,
        stigmaGeneral,
        weldingMethod,
        weldedType,
        weldedSeam,
        weldedConnection,
        weldedPosition,
        weldedJoint,
        axesPosition,
        preheating,
        heatTreatment,
        brand,
        thickness,
        diameter,
        electrode,
        flux,
        controls,
        npa,
        grade,
        decision,
        accesses,
        expiration,
        comission,
        numCertificate,
        weldingMethodScope,
        weldedTypeScope,
        weldedSeamScope,
        brandScope,
        electrodeScope,
        fluxScope,
        auxiliaryScope,
        thicknessScope,
        diameterScope,
        weldedPositionScope,
        weldedConnectionScope,
        weldedJointScope,
        axesPositionScope,
      } = req.body;

      const existing = await Certificate.findOne({ numCertificate });

      if (existing) {
        // return res.json({ certificate: existing });
        return res
          .status(400)
          .json({ message: "Такое удостоверение уже добавлено" });
      }

      const certificate = new Certificate({
        certType,
        date,
        numProtocol,
        textHead,
        firstname,
        secondname,
        lastname,
        birthday,
        passport,
        numOldCert,
        dateOldCert,
        work,
        workYears,
        qualifyingRank,
        attestationType,
        stigma,
        stigmaGeneral,
        weldingMethod,
        weldedType,
        weldedSeam,
        weldedConnection,
        weldedPosition,
        weldedJoint,
        axesPosition,
        preheating,
        heatTreatment,
        brand,
        thickness,
        diameter,
        electrode,
        flux,
        controls,
        npa,
        grade,
        decision,
        accesses,
        expiration,
        comission,
        numCertificate,
        weldingMethodScope,
        weldedTypeScope,
        weldedSeamScope,
        brandScope,
        electrodeScope,
        fluxScope,
        auxiliaryScope,
        thicknessScope,
        diameterScope,
        weldedPositionScope,
        weldedConnectionScope,
        weldedJointScope,
        axesPositionScope,
      });

      await certificate.save();

      res.status(201).json({ certificate });
    } catch (e) {
      // console.log("CREATE ERROR:: ", e);
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const certificates = await Certificate.find();
    res.json(certificates);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    res.json(certificate);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      const newCertificate = req.body;

      await Certificate.findByIdAndUpdate(id, newCertificate);

      res.status(200).json({ message: "Удостоверение успешно обновлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    const value = req.body;

    try {
      await Certificate.findByIdAndUpdate(req.params.id, value);
      res.status(200).json({ message: "Значение успешно обновлено" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const id = req.params.id;
      // const result = await Certificate.findByIdAndDelete(id);
      await Certificate.findByIdAndDelete(id);
      res.status(200).json({ message: "Удостоверение успешно удалено!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
