const express = require("express");
const router = express.Router();
const Purity = require("../models/Purity");

// create api
router.post("/", async (req, res) => {
  try {
    const purity = await Purity.create(req.body);
    res.status(201).json(purity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// read api
router.get("/", async (req, res) => {
  const purities = await Purity.find();
  res.json(purities);
});

// update api
router.put("/:id", async (req, res) => {
  const purity = await Purity.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(purity);
});

// delete api
router.delete("/:id", async (req, res) => {
  await Purity.findByIdAndDelete(req.params.id);
  res.json({ message: "Purity deleted" });
});

module.exports = router;
