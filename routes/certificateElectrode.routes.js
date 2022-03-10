const { Router } = require("express");
const CertElectrode = require("../models/CertificateElectrode");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertElectrode.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certElectrode = new CertElectrode({
      value,
    });

    await certElectrode.save();

    res.status(201).json({ certElectrode });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certElectrode = await CertElectrode.find();
    res.json(certElectrode);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certElectrode = await CertElectrode.findById(req.params.id);
    res.json(certElectrode);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certElectrode = await CertElectrode.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
