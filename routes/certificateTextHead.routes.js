const { Router } = require("express");
const CertTextHead = require("../models/CertificateTextHead");
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

      const existing = await CertTextHead.findOne({ value });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Такое значение уже добавлено" });
      }

      const certTextHead = new CertTextHead({
        value,
      });

      await certTextHead.save();

      res.status(201).json({ certTextHead });
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
      const certTextHead = await CertTextHead.find();
      res.json(certTextHead);
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
      const certTextHead = await CertTextHead.findById(req.params.id);
      res.json(certTextHead);
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    const value = req.body;
    try {
      await CertTextHead.findByIdAndUpdate(req.params.id, value);
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
      const certTextHead = await CertTextHead.findByIdAndDelete(id);
      res.status(200).json({ message: "Запись успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
