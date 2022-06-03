const { Router } = require("express");
const CertAttestationType = require("../models/CertificateAttestationType");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");
const router = Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const { value } = req.body;

      const existing = await CertAttestationType.findOne({ value });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Такое значение уже добавлено" });
      }

      const certAttestationType = new CertAttestationType({
        value,
      });

      await certAttestationType.save();

      res.status(201).json({ certAttestationType });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const certAttestationType = await CertAttestationType.find();
      res.json(certAttestationType);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const certAttestationType = await CertAttestationType.findById(
        req.params.id
      );
      res.json(certAttestationType);
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
      const certAttestationType = await CertAttestationType.findByIdAndDelete(
        id
      );
      res.status(200).json({ message: "Запись успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
