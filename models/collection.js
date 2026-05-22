const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  perfumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "perfume",
    required: true,
  },
  role: { type: String, default: null },
});

module.exports = mongoose.model("collection", collectionSchema);
