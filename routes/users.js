const router = require('express').Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const {
  createUser,
  updateUser,
  updateAvatar,
  getMe,
  deleteAccount,
} = require('../controllers/usersController');

router.post('/', createUser);

router.patch('/me', authMiddleware, updateUser);

router.patch('/me/avatar', authMiddleware, updateAvatar);

router.get('/me', authMiddleware, getMe);

router.delete('/me', authMiddleware, deleteAccount);

module.exports = router;
