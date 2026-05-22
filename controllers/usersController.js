const userModel = require("../models/user");

function getUsers(req, res, next) {
  userModel
    .find({})
    .then((users) => res.status(200).json(users))
    .catch((err) => next(err));
}

function getUserById(req, res, next) {
  const { id } = req.params;
  userModel
    .findById(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => next(err));
}

function createUser(req, res, next) {
  const { username, name, about, avatar, email, password, analyzed } = req.body;
  if (!username || !name || !about || !email || !password) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  userModel
    .create({
      username,
      name,
      about,
      avatar,
      email,
      password,
      analyzed,
    })
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => next(err));
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
