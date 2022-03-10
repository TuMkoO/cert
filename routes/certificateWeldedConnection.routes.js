const { Router } = require("express");
const CertWeldedConnection = require("../models/CertificateWeldedConnection");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertWeldedConnection.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certWeldedConnection = new CertWeldedConnection({
      value,
    });

    await certWeldedConnection.save();

    res.status(201).json({ certWeldedConnection });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certWeldedConnection = await CertWeldedConnection.find();
    res.json(certWeldedConnection);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certWeldedConnection = await CertWeldedConnection.findById(
      req.params.id
    );
    res.json(certWeldedConnection);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certWeldedConnection = await CertWeldedConnection.findByIdAndDelete(
      id
    );
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
