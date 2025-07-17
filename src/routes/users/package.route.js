const express = require("express");
const { validate } = require("../../middlewares/validation");
const { packageValidation } = require("../../validations");
const { packageController } = require("../../controllers");
const { verifyTokens } = require("../../middlewares/verifyTokens");

const route = express.Router();

route.use(verifyTokens);
route.post(
  "/",
  validate(packageValidation.createPackage),
  packageController.createPackage
);

route.get(
  "/:id",
  validate(packageValidation.packageById),
  packageController.getPackageById
);

route.put(
  "/:id",
  validate(packageValidation.updatePackage),
  packageController.updatePackage
);

route.post(
  "/findandfilter",
  validate(packageValidation.findAndFilterPackages),
  packageController.findandfilter
);

route.delete(
  "/:id",
  validate(packageValidation.deletePackage),
  packageController.deletePackage
);

module.exports = route;
