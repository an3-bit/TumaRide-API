const express = require("express");
const { validate } = require("../../middlewares/validation");
const { userValidation } = require("../../validations");
const { userController } = require("../../controllers");
const { verifyTokens } = require("../../middlewares/verifyTokens");

const route = express.Router();

route.use(verifyTokens);
route.get("/auth-user", userController.getauthUser);

route.put(
  "/:id",

  validate(userValidation.updateUser),
  userController.updateUser
);

route.post(
  "/findandfilter",

  validate(userValidation.findandfilter),
  userController.findandfilter
);

route.delete(
  "/:id",

  validate(userValidation.deleteBranch),
  userController.deleteUser
);

module.exports = route;
