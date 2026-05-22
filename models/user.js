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
});

module.exports = mongoose.model("user", userSchema);
