const { Router } = require("express");
const QrCode = require("../models/QrCode");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { link } = req.body;

    // const existing = await System.findOne({ value });

    // if (existing) {
    //   return res.status(400).json({ message: "Такое значение уже добавлено" });
    // }

    const qrCode = new QrCode({
      link,
    });

    await qrCode.save();

    res.status(201).json({ qrCode });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const qrCode = await QrCode.find();
    res.json(qrCode);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const qrCode = await QrCode.findById(req.params.id);
    res.json(qrCode);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.put("/:id", auth, async (req, res) => {
  const value = req.body;

  try {
    await QrCode.findByIdAndUpdate(req.params.id, value);
    res.status(200).json({ message: "Значение успешно обновлено" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const qrCode = await QrCode.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
