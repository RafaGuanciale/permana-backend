const router = require("express").Router();
const { login } = require("../controllers/authController");
const { celebrate, Joi } = require("celebrate");

router.post(
  "/login",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

module.exports = router;
