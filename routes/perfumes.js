const router = require('express').Router();
const { getPerfumes } = require('../controllers/perfumesController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getPerfumes);

module.exports = router;
