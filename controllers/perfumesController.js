const perfumesData = require('../data/perfumes');

function getPerfumes(req, res, next) {
  res.json(perfumesData);
}

module.exports = {
  getPerfumes,
};
