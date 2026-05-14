const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const { v4: uuidv4 } = require('uuid');

const usersData = require('../data/users');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res, next) => {
  fs.readFile(usersFilePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

router.post('/', (req, res) => {
  const {
    username,
    name,
    about,
    avatar,
  } = req.body;
  if (!username || !name || !about || !avatar) {
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
});

module.exports = router;
