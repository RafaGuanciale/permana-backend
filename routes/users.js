const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/usersController');

router.get('/', getUsers);

router.post('/', createUser);

router.patch('/me', updateUser);

router.patch('/me/avatar', updateAvatar);

router.get('/:id', getUserById);

module.exports = router;
