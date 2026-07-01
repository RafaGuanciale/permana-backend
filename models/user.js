const mongoose = require('mongoose');
const validator = require('validator');

const regex = /(http|https):\/\/(www\.)?[\w-]+\.\w+([/\w._~:/?%#[\]@!$&'()*+,;=]*)?/;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: {
    type: String,
    default:
      'https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg',
    validate: {
      validator: (value) => regex.test(value),
      message: 'Insira uma URL válida',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: 'Insira um email válido',
    },
  },
  password: { type: String, required: true, select: false },
  analyzed: { type: Boolean, default: false },
  olfactoryProfile: {
    dominantFamily: String,
    signature: String, // IA
    goodAt: String, // IA
    badAt: String, // IA
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
      goodAt: { type: Map, of: Number },
      badAt: { type: Map, of: Number },
    },
  },
  recommendations: {
    type: Map,
    of: {
      light: [{ type: mongoose.Schema.Types.ObjectId, ref: 'perfume' }],
      premium: [{ type: mongoose.Schema.Types.ObjectId, ref: 'perfume' }],
      niche: [{ type: mongoose.Schema.Types.ObjectId, ref: 'perfume' }],
    },
  },
});

module.exports = mongoose.model('user', userSchema);
