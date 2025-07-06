const express = require("express");
const router = express.Router();

const metals = ["Gold", "Silver", "Platinum"];

router.get("/", (req, res) => {
  res.json(metals);
});

module.exports = router;