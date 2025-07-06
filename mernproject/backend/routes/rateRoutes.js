const express = require("express");
const router = express.Router();
const MetalRate = require("../models/MetalRate");

// get latest rate for metal & purity
router.get("/latest", async (req, res) => {
  const { metal, purity } = req.query;
  const latestRate = await MetalRate.findOne({ metal, purity }).sort({ rateDate: -1 });
  res.json(latestRate);
});

// create new rate entry
router.post("/", async (req, res) => {
  const rate = await MetalRate.create(req.body);
  res.status(201).json(rate);
});

// GET rates with optional filter and pagination
router.get("/", async (req, res) => {
  const { metal, purity, page = 1, limit = 10 } = req.query;
  const query = {};
  if (metal) query.metal = metal;
  if (purity) query.purity = purity;

  const rates = await MetalRate.find(query)
    .sort({ rateDate: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  res.json(rates);
});

module.exports = router;
