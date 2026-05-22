const perfumeModel = require("../models/perfume");

function getPerfumes(req, res, next) {
  perfumeModel
    .find({})
    .then((perfumes) => res.status(200).json(perfumes))
    .catch((err) => next(err));
}

function createPerfume(req, res, next) {
  const {
    name,
    brand,
    link,
    description,
    family,
    occasion,
    climate,
    intensity,
  } = req.body;
  if (
    !name ||
    !brand ||
    !description ||
    !family ||
    !occasion ||
    !climate ||
    !intensity
  ) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  perfumeModel
    .create({
      name,
      brand,
      link,
      description,
      family,
      occasion,
      climate,
      intensity,
    })
    .then((newPerfume) => res.status(201).json(newPerfume))
    .catch((err) => next(err));
}

module.exports = {
  getPerfumes,
  createPerfume,
};
