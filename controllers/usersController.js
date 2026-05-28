const userModel = require('../models/user');

function getUsers(req, res, next) {
  userModel
    .find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      err.entity = 'Usuário';
      next(err);
    });
}

function getUserById(req, res, next) {
  const { id } = req.params;
  userModel
    .findById(id)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      err.entity = 'Usuário';
      next(err);
    });
}

function createUser(req, res, next) {
  const { username, name, about, avatar, email, password } = req.body;

  userModel
    .create({
      username,
      name,
      about,
      avatar,
      email,
      password,
    })
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => {
      err.entity = 'Usuário';
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
      err.entity = 'Usuário';
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
      err.entity = 'Usuário';
      next(err);
    });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
