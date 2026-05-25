const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  about: { type: String, required: true },
  avatar: {
    type: String,
    default:
      "https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg",
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  analyzed: { type: Boolean, default: false },
  olfactoryProfile: {
    dominantFamily: String,
    signature: String, // IA
    goodAt: String,
    badAt: String,
    rarity: String,
    breakdown: {
      light: Number,
      premium: Number,
      niche: Number,
    },
    olfactoryDistribution: {
      type: Map,
      of: Number,
    },
    practicalImpact: {
      goodAt: {
        night: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
        day: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
        cold: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
        hot: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
        formal: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
        casual: [{ type: mongoose.Schema.Types.ObjectId, ref: "collection" }],
      },
      badAt: {
        night: Number,
        day: Number,
        cold: Number,
        hot: Number,
        formal: Number,
        casual: Number,
      },
    },
  },
  recommendations: {
    type: Map,
    of: {
      light: [{ type: mongoose.Schema.Types.ObjectId, ref: "perfume" }],
      premium: [{ type: mongoose.Schema.Types.ObjectId, ref: "perfume" }],
      niche: [{ type: mongoose.Schema.Types.ObjectId, ref: "perfume" }],
    },
  },
});

module.exports = mongoose.model("user", userSchema);
