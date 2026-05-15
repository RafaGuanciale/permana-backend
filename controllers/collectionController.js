const { v4: uuidv4 } = require('uuid');

const collectionData = require('../data/collection');

const userData = require('../data/users');

function getCollection(req, res, next) {
  res.json(collectionData);
}

function addPerfumeInCollection(req, res, next) {
  const { userId, perfumeId } = req.body;
  if (!userId || !perfumeId) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const newPerfume = {
    _id: uuidv4(),
    userId,
    perfumeId,
    role: null,
  };

  const userInfo = userData.find((user) => user._id === userId);
  if (!userInfo) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  collectionData.push(newPerfume);
  userInfo.analyzed = false;

  res
    .status(201)
    .send(`New perfume added to collection with id: ${newPerfume._id}`);
}

module.exports = {
  getCollection,
  addPerfumeInCollection,
};
