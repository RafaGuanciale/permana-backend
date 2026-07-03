const bcrypt = require("bcryptjs");
const userModel = require("../models/user");
const collectionModel = require("../models/collection");

function getMe(req, res, next) {
  const userId = req.user._id;
  userModel
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      next(Object.assign(err, { entity: "Usuário" }));
    });
}

function createUser(req, res, next) {
  const { username, name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashPassword) =>
      userModel.create({
        username,
        name,
        about,
        avatar,
        email,
        password: hashPassword,
      }),
    )
    .then((newUser) => {
      const user = newUser.toObject();
      delete user.password;
      res.status(201).json(user);
    })
    .catch((err) => {
      next(Object.assign(err, { entity: "Usuário" }));
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
      next(Object.assign(err, { entity: "Usuário" }));
    });
}

function deleteAccount(req, res, next) {
  const ownerId = req.user._id;
  const { password } = req.body;

  userModel
    .findById(ownerId)
    .select("+password")
    .orFail()
    .then((user) =>
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          throw Object.assign(new Error(), {
            name: "UnauthorizedError",
          });
        }

        return collectionModel
          .deleteMany({ userId: ownerId })
          .then((result) => {
            return userModel.findByIdAndDelete(ownerId).orFail();
          });
      }),
    )
    .then(() => {
      res.status(200).json({
        message: "Usuário deletado",
      });
    })
    .catch((err) => {
      next(Object.assign(err, { entity: "Usuário" }));
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
      next(Object.assign(err, { entity: "Usuário" }));
    });
}

module.exports = {
  getMe,
  createUser,
  updateUser,
  deleteAccount,
  updateAvatar,
};
