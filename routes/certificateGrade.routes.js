const { Router } = require("express");
const CertGrade = require("../models/CertificateGrade");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertGrade.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certGrade = new CertGrade({
      value,
    });

    await certGrade.save();

    res.status(201).json({ certGrade });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certGrade = await CertGrade.find();
    res.json(certGrade);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certGrade = await CertGrade.findById(req.params.id);
    res.json(certGrade);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certGrade = await CertGrade.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
