const router = require('express').Router();
const { getPerfumes } = require('../controllers/perfumesController');

router.get('/', getPerfumes);

module.exports = router;
