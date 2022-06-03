const { Router } = require("express");
const CertWeldingMethod = require("../models/CertificateWeldingMethod");
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

      const existing = await CertWeldingMethod.findOne({ value });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Такое значение уже добавлено" });
      }

      const certWeldingMethod = new CertWeldingMethod({
        value,
      });

      await certWeldingMethod.save();

      res.status(201).json({ certWeldingMethod });
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
      const certWeldingMethod = await CertWeldingMethod.find();
      res.json(certWeldingMethod);
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
      const certWeldingMethod = await CertWeldingMethod.findById(req.params.id);
      res.json(certWeldingMethod);
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
      const certWeldingMethod = await CertWeldingMethod.findByIdAndDelete(id);
      res.status(200).json({ message: "Запись успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
