const { Router } = require("express");
const CertWeldedJoint = require("../models/CertificateWeldedJoint");
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

      const existing = await CertWeldedJoint.findOne({ value });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Такое значение уже добавлено" });
      }

      const certWeldedJoint = new CertWeldedJoint({
        value,
      });

      await certWeldedJoint.save();

      res.status(201).json({ certWeldedJoint });
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
      const certWeldedJoint = await CertWeldedJoint.find();
      res.json(certWeldedJoint);
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
      const certWeldedJoint = await CertWeldedJoint.findById(req.params.id);
      res.json(certWeldedJoint);
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
      const certWeldedJoint = await CertWeldedJoint.findByIdAndDelete(id);
      res.status(200).json({ message: "Запись успешно удалена!" });
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
      const certWeldedJoint = await CertWeldedJoint.findByIdAndUpdate(
        req.params.id,
        value,
        {
          new: true,
        }
      );
      // res.status(200).json({ message: "Значение успешно обновлено" });
      res.status(201).json({ certWeldedJoint });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
