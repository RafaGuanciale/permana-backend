const router = require("express").Router();
const {
  getCollection,
  getMyCollection,
  addPerfumeInCollection,
  removePerfumeFromCollection,
} = require("../controllers/collectionController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getCollection);

router.get("/me", authMiddleware, getMyCollection);

router.post("/", authMiddleware, addPerfumeInCollection);

router.delete("/:perfumeId", authMiddleware, removePerfumeFromCollection);

module.exports = router;
