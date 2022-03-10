const { Router } = require("express");
const CertWeldedSeam = require("../models/CertificateWeldedSeam");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertWeldedSeam.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certWeldedSeam = new CertWeldedSeam({
      value,
    });

    await certWeldedSeam.save();

    res.status(201).json({ certWeldedSeam });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certWeldedSeam = await CertWeldedSeam.find();
    res.json(certWeldedSeam);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certWeldedSeam = await CertWeldedSeam.findById(req.params.id);
    res.json(certWeldedSeam);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certWeldedSeam = await CertWeldedSeam.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
