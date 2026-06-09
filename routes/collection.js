const router = require('express').Router();
const { getCollection, getMyCollection, addPerfumeInCollection } = require('../controllers/collectionController');
const { authMiddleware } = require("../middleware/authMiddleware");

router.get('/', authMiddleware, getCollection);

router.get('/me', authMiddleware, getMyCollection);

router.post('/', authMiddleware, addPerfumeInCollection);

module.exports = router;
