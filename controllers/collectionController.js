const collectionModel = require("../models/collection");

const userModel = require("../models/user");

function getCollection(req, res, next) {
  collectionModel
    .find({})
    .then((collection) => res.status(200).json(collection))
    .catch((err) => {
      err.entity = "Collection";
      next(err);
    });
}

function getMyCollection(req, res, next) {
  const userId = req.user._id;
  collectionModel
    .find({ userId })
    .populate("perfumeId")
    .then((collection) => res.status(200).json(collection))
    .catch((err) => {
      err.entity = "Collection";
      next(err);
    });
}

async function addPerfumeInCollection(req, res, next) {
  try {
    const { userId, perfumeId } = req.body;
    await userModel
      .findByIdAndUpdate(userId, { analyzed: false }, { new: true })
      .orFail();
    const existing = await collectionModel.findOne({ userId, perfumeId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Perfume já adicionado à coleção" });
    }
    const newEntry = await collectionModel.create({ userId, perfumeId });
    res.status(201).json(newEntry);
  } catch (err) {
    err.entity = "Collection";
    next(err);
  }
}

module.exports = {
  getCollection,
  getMyCollection,
  addPerfumeInCollection,
};
