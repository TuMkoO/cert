const { Router } = require("express");
const CertWeldedPosition = require("../models/CertificateWeldedPosition");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertWeldedPosition.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certWeldedPosition = new CertWeldedPosition({
      value,
    });

    await certWeldedPosition.save();

    res.status(201).json({ certWeldedPosition });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certWeldedPosition = await CertWeldedPosition.find();
    res.json(certWeldedPosition);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certWeldedPosition = await CertWeldedPosition.findById(req.params.id);
    res.json(certWeldedPosition);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certWeldedPosition = await CertWeldedPosition.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
