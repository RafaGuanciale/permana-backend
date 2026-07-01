const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { getWeather } = require('../controllers/weatherController');

router.get('/', authMiddleware, getWeather);

module.exports = router;
