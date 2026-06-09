const userModel = require("../models/user");
const bcrypt = require("bcrypt");

function getMe(req, res, next) {
  const userId = req.user._id;
  userModel
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      err.entity = "Usuário";
      next(err);
    });
}

function createUser(req, res, next) {
  const { username, name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashPassword) => {
      userModel
        .create({
          username,
          name,
          about,
          avatar,
          email,
          password: hashPassword,
        })
        .then((newUser) => res.status(201).json(newUser));
    })
    .catch((err) => {
      err.entity = "Usuário";
      next(err);
    });
}

function updateUser(req, res, next) {
  const ownerId = req.user._id;
  const { name, about } = req.body;
  userModel
    .findByIdAndUpdate(
      ownerId,
      { name, about },
      { new: true, runValidators: true },
    )
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      err.entity = "Usuário";
      next(err);
    });
}

function updateAvatar(req, res, next) {
  const ownerId = req.user._id;
  const { avatar } = req.body;
  userModel
    .findByIdAndUpdate(ownerId, { avatar }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      err.entity = "Usuário";
      next(err);
    });
}

module.exports = {
  getMe,
  createUser,
  updateUser,
  updateAvatar,
};
