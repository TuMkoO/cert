const { Router } = require("express");
const CertAccess = require("../models/CertificateAccess");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertAccess.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certAccess = new CertAccess({
      value,
    });

    await certAccess.save();

    res.status(201).json({ certAccess });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certAccess = await CertAccess.find();
    res.json(certAccess);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certAccess = await CertAccess.findById(req.params.id);
    res.json(certAccess);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certAccess = await CertAccess.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const value = req.body;

  try {
    const certAccess = await CertAccess.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      }
    );
    // res.status(200).json({ message: "Значение успешно обновлено" });
    res.status(201).json({ certAccess });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
