const perfumeModel = require('../models/perfume');

function getPerfumes(req, res, next) {
  let filter;
  if (req.query.search) {
    const regex = new RegExp(req.query.search, 'i');
    filter = { $or: [{ name: regex }, { brand: regex }] };
  } else {
    filter = { popular: true };
  }

  perfumeModel
    .find(filter)
    .then((perfumes) => res.status(200).json(perfumes))
    .catch((err) => {
      next(Object.assign(err, { entity: 'Perfume' }));
    });
}

module.exports = {
  getPerfumes,
};
