const { authMiddleware } = require("../middleware/authMiddleware");
const router = require("express").Router();
const { getWeather } = require("../controllers/weatherController");

router.get("/", authMiddleware, getWeather);

module.exports = router;
