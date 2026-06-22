const collectionModel = require("../models/collection");

const userModel = require("../models/user");

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
    const userId = req.user._id;
    const { perfumeId } = req.body;
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

async function removePerfumeFromCollection(req, res, next) {
  try {
    const userId = req.user._id;
    const { perfumeId } = req.params;
    await userModel
      .findByIdAndUpdate(userId, { analyzed: false }, { new: true })
      .orFail();
    const removed = await collectionModel.findOneAndDelete({
      userId,
      perfumeId,
    });
    if (!removed) {
      return res
        .status(404)
        .json({ message: "Perfume não encontrado na coleção" });
    }

    res.status(200).json(removed);
  } catch (err) {
    err.entity = "Collection";
    next(err);
  }
}

module.exports = {
  getMyCollection,
  addPerfumeInCollection,
  removePerfumeFromCollection,
};
