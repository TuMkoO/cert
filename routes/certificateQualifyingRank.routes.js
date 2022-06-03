const { Router } = require("express");
// const config = require("config");
const CertQualifyingRank = require("../models/CertificateQualifyingRank");
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

      const existing = await CertQualifyingRank.findOne({ value });

      if (existing) {
        // return res.json({ certQualifyingRank: existing });
        return res
          .status(400)
          .json({ message: "Такое значение уже добавлено" });
      }

      const certQualifyingRank = new CertQualifyingRank({
        value,
      });

      await certQualifyingRank.save();

      res.status(201).json({ certQualifyingRank });
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
      const certQualifyingRank = await CertQualifyingRank.find();
      res.json(certQualifyingRank);
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
      const certQualifyingRank = await CertQualifyingRank.findById(
        req.params.id
      );
      res.json(certQualifyingRank);
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
      // const id = req.params.id;
      // await certQualifyingRank.findByIdAndDelete(id);

      const id = req.params.id;
      const certQualifyingRank = await CertQualifyingRank.findByIdAndDelete(id);
      // res.json(certQualifyingRank);
      res.status(200).json({ message: "Запись успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
