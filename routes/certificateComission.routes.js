const { Router } = require("express");
const CertComission = require("../models/CertificateComission");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertComission.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certComission = new CertComission({
      value,
    });

    await certComission.save();

    res.status(201).json({ certComission });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certComission = await CertComission.find();
    res.json(certComission);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certComission = await CertComission.findById(req.params.id);
    res.json(certComission);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certComission = await CertComission.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
