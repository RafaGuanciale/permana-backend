const { authMiddleware } = require("../middleware/authMiddleware");
const router = require("express").Router();
const {
  createUser,
  updateUser,
  updateAvatar,
  getMe,
} = require("../controllers/usersController");

router.post("/", createUser);

router.patch("/me", authMiddleware, updateUser);

router.patch("/me/avatar", authMiddleware, updateAvatar);

router.get("/me", authMiddleware, getMe);

module.exports = router;
