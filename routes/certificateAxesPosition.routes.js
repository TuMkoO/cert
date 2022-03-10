const { Router } = require("express");
const CertAxesPosition = require("../models/CertificateAxesPosition");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertAxesPosition.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certAxesPosition = new CertAxesPosition({
      value,
    });

    await certAxesPosition.save();

    res.status(201).json({ certAxesPosition });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certAxesPosition = await CertAxesPosition.find();
    res.json(certAxesPosition);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certAxesPosition = await CertAxesPosition.findById(req.params.id);
    res.json(certAxesPosition);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certAxesPosition = await CertAxesPosition.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const value = req.body;

  try {
    const certAxesPosition = await CertAxesPosition.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      }
    );
    // res.status(200).json({ message: "Значение успешно обновлено" });
    res.status(201).json({ certAxesPosition });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
