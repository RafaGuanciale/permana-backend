const router = require('express').Router();
const { getCollection, addPerfumeInCollection } = require('../controllers/collectionController');

router.get('/', getCollection);

router.post('/', addPerfumeInCollection);

module.exports = router;
