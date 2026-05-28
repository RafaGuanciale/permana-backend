const router = require('express').Router();
const { getCollection, getMyCollection, addPerfumeInCollection } = require('../controllers/collectionController');

router.get('/', getCollection);

router.get('/me', getMyCollection);

router.post('/', addPerfumeInCollection);

module.exports = router;
