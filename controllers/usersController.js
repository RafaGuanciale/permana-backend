const { v4: uuidv4 } = require('uuid');

const usersData = require('../data/users');

function getUsers(req, res, next) {
  res.json(usersData);
}

function createUser(req, res, next) {
  const {
    username,
    name,
    about,
    avatar = 'https://i.pinimg.com/736x/3c/67/75/3c67757cef723535a7484a6c7bfbfc43.jpg',
  } = req.body;
  if (!username || !name || !about) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const newUser = {
    _id: uuidv4(),
    username,
    name,
    about,
    avatar,
  };
  usersData.push(newUser);

  res.status(201).send(newUser);
}

module.exports = {
  getUsers,
  createUser,
};
