const express = require("express");
const { validate } = require("../../middlewares/validation");
const { paymentValidation } = require("../../validations");
const { paymentController } = require("../../controllers");
const { verifyTokens } = require("../../middlewares/verifyTokens");

const route = express.Router();

route.use(verifyTokens);

route.get(
  "/:id",
  validate(paymentValidation.getPaymentById),
  paymentController.getPaymentById
);

route.post(
  "/findandfilter",
  validate(paymentValidation.findAndFilterPayments),
  paymentController.findandfilter
);

module.exports = route;
