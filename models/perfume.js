const mongoose = require("mongoose");

const perfumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  link: { type: String, default: "" },
  description: { type: String, required: true },
  family: { type: String, required: true },
  occasion: { type: String, required: true },
  climate: { type: String, required: true },
  intensity: { type: String, required: true },
});

module.exports = mongoose.model("perfume", perfumeSchema);
