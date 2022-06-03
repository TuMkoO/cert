const { Router } = require("express");
const CertAccessItem = require("../models/CertificateAccessItem");
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
      const { certAccessId } = req.body;
      // console.log("certificateAccessItem.routes/create req.body === ", req.body);
      // console.log("certificateAccessItem.routes/create value === ", value);
      // console.log(
      //   "certificateAccessItem.routes/create certAccessId === ",
      //   certAccessId
      // );

      const existing = await CertAccessItem.findOne({ value });

      if (existing) {
        return res
          .status(400)
          .json({ message: "Такое значение уже добавлено" });
      }

      const certAccessItem = new CertAccessItem({
        value,
        // owner: req.certAccess.certAccessId,
        owner: certAccessId,
      });

      await certAccessItem.save();

      res.status(201).json({ certAccessItem });
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
    const { certAccessId } = req.body;

    if (certAccessId) {
      try {
        const certAccessItems = await CertAccessItem.find({
          owner: certAccessId,
        });
        res.json(certAccessItems);
      } catch (e) {
        res
          .status(500)
          .json({ message: "Что-то пошло не так, попробуйте снова" });
      }
    } else {
      try {
        const certAccessItems = await CertAccessItem.find();
        res.json(certAccessItems);
      } catch (e) {
        res
          .status(500)
          .json({ message: "Что-то пошло не так, попробуйте снова" });
      }
    }
  }
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin", "god"]),
  async (req, res) => {
    try {
      const certAccessItem = await CertAccessItem.findById(req.params.id);
      res.json(certAccessItem);
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
      const certAccessItem = await CertAccessItem.findByIdAndDelete(id);
      res.status(200).json({ message: "Запись успешно удалена!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова" });
    }
  }
);

module.exports = router;
