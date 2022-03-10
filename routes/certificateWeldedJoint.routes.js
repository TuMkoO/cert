const { Router } = require("express");
const CertWeldedJoint = require("../models/CertificateWeldedJoint");
const auth = require("../middleware/auth.middleware");
const router = Router();

router.post("/create", auth, async (req, res) => {
  try {
    const { value } = req.body;

    const existing = await CertWeldedJoint.findOne({ value });

    if (existing) {
      return res.status(400).json({ message: "Такое значение уже добавлено" });
    }

    const certWeldedJoint = new CertWeldedJoint({
      value,
    });

    await certWeldedJoint.save();

    res.status(201).json({ certWeldedJoint });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const certWeldedJoint = await CertWeldedJoint.find();
    res.json(certWeldedJoint);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const certWeldedJoint = await CertWeldedJoint.findById(req.params.id);
    res.json(certWeldedJoint);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;
    const certWeldedJoint = await CertWeldedJoint.findByIdAndDelete(id);
    res.status(200).json({ message: "Запись успешно удалена!" });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

router.patch("/:id", auth, async (req, res) => {
  const value = req.body;

  try {
    const certWeldedJoint = await CertWeldedJoint.findByIdAndUpdate(
      req.params.id,
      value,
      {
        new: true,
      }
    );
    // res.status(200).json({ message: "Значение успешно обновлено" });
    res.status(201).json({ certWeldedJoint });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
  }
});

module.exports = router;
