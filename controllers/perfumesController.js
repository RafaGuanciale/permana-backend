const perfumeModel = require('../models/perfume');

function getPerfumes(req, res, next) {
  perfumeModel
    .find({})
    .then((perfumes) => res.status(200).json(perfumes))
    .catch((err) => {
      err.entity = 'Perfume';
      next(err);
    });
}

module.exports = {
  getPerfumes,
};
