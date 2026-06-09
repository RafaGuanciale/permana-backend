const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function login(req, res, next) {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            algorithm: "HS256",
            expiresIn: "7d",
          });
          return res.status(200).json({ token });
        } else {
          return res
            .status(401)
            .json({ message: "Usuário ou senha inválidos" });
        }
      });
    })
    .catch((err) => {
      err.entity = "Usuário";
      next(err);
    });
}

module.exports = {
  login,
};
