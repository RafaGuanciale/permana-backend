const userModel = require("../models/user");

function login(req, res, next) {
  const { email, password } = req.body;

  userModel
    .findOne({ email })
    .then((user) => {
      if (!user || user.password !== password) {
        return res.status(401).json({
          message: "Usuário ou senha inválidos",
        });
      }

      return res.status(200).json(user);
    })
    .catch((err) => {
      err.entity = "Usuário";
      next(err);
    });
}

module.exports = {
  login,
};
