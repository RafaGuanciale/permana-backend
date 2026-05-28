const mongoose = require('mongoose');

const perfumeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
      required: true,
    },
    // ========== TAGS VISUAIS (UI) ============
    mainFamily: {
      type: String,
      required: true,
    },
    mainOccasion: {
      type: String,
      required: true,
    },
    mainClimate: {
      type: String,
      required: true,
    },
    mainIntensity: {
      type: String,
      required: true,
      enum: ['leve', 'moderado', 'forte', 'extremo'],
    },
    // ========== DADOS ANALÍTICOS ============
    families: [
      {
        type: String,
      },
    ],
    occasions: [
      {
        type: String,
      },
    ],
    climates: [
      {
        type: String,
      },
    ],
    accords: [
      {
        type: String,
      },
    ],
    notes: {
      top: [String],
      middle: [String],
      base: [String],
    },
    olfactoryProfile: {
      fresh: { type: Number, default: 0 },
      citrus: { type: Number, default: 0 },
      woody: { type: Number, default: 0 },
      spicy: { type: Number, default: 0 },
      sweet: { type: Number, default: 0 },
      smoky: { type: Number, default: 0 },
      powdery: { type: Number, default: 0 },
      aromatic: { type: Number, default: 0 },
      floral: { type: Number, default: 0 },
      gourmand: { type: Number, default: 0 },
    },
    performance: {
      longevity: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
      projection: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
      },
    },
    priceCategory: {
      type: String,
      enum: ['light', 'premium', 'niche'],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      enum: ['masculino', 'feminino', 'unissex'],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('perfume', perfumeSchema);
