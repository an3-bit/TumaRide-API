const express = require("express");
const { validate } = require("../../middlewares/validation");
const { documentValidation } = require("../../validations");
const { documentController } = require("../../controllers");
const { verifyTokens } = require("../../middlewares/verifyTokens");

const route = express.Router();

route.use(verifyTokens);

route.get(
  "/:id",
  validate(documentValidation.getDocumentById),
  documentController.getDocumentById
);

route.post(
  "/findandfilter",
  validate(documentValidation.findAndFilterDocuments),
  documentController.findAndFilterDocuments
);

route.delete(
  "/:id",
  validate(documentValidation.deleteDocument),
  documentController.deleteDocument
);

module.exports = route;
