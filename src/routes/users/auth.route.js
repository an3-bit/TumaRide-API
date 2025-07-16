const express = require("express");
const { validate } = require("../../middlewares/validation");
const { userValidation } = require("../../validations");
const { authController } = require("../../controllers");
const { verifyTokens } = require("../../middlewares/verifyTokens");

const route = express.Router();

route.post(
  "/signup",
  validate(userValidation.createUser),
  authController.createUser
);
route.post(
  "/reset-password",
  verifyTokens,
  validate(userValidation.resetPassword),
  authController.resetPassword
);

route.post("/login", validate(userValidation.login), authController.login);

route.post(
  "/login/otp",
  verifyTokens,
  validate(userValidation.otp_login),
  authController.otp_login
);
module.exports = route;
