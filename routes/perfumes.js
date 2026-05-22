const router = require('express').Router();
const { getPerfumes, createPerfume } = require('../controllers/perfumesController');

router.get('/', getPerfumes);

router.post('/', createPerfume);

module.exports = router;
