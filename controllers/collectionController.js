const collectionModel = require("../models/collection");

const userModel = require("../models/user");

function getCollection(req, res, next) {
  collectionModel
    .find({})
    .then((collection) => res.status(200).json(collection))
    .catch((err) => next(err));
}

async function addPerfumeInCollection(req, res, next) {
  try {
    const { userId, perfumeId } = req.body;
    if (!userId || !perfumeId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const user = await userModel.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    await userModel.findByIdAndUpdate(userId, {
      analyzed: false,
    });
    const newEntry = await collectionModel.create({ userId, perfumeId });
    res.status(201).json(newEntry);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCollection,
  addPerfumeInCollection,
};
