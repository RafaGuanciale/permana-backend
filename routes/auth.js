const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/authController');

router.post(
  '/login',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8).max(30),
    }),
  }),
  login,
);

module.exports = router;
