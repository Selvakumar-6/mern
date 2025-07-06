const mongoose = require("mongoose");

const puritySchema = new mongoose.Schema({
  name: { type: String, required: true },
  metal: { type: String, required: true },
});

module.exports = mongoose.model("Purity", puritySchema);
