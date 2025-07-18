const express = require("express");
const { validate } = require("../../middlewares/validation");
const { feedbackValidation } = require("../../validations");
const { feedbackController } = require("../../controllers");
const { verifyTokens } = require("../../middlewares/verifyTokens");

const route = express.Router();

route.use(verifyTokens);

route.post(
  "/",
  validate(feedbackValidation.createFeedback),
  feedbackController.createFeedback
);

route.get(
  "/:id",
  validate(feedbackValidation.getFeedbackById),
  feedbackController.getFeedbackById
);

route.put(
  "/:id",
  validate(feedbackValidation.updateFeedback),
  feedbackController.updateFeedback
);

route.post(
  "/findandfilter",
  validate(feedbackValidation.findAndFilterFeedback),
  feedbackController.findandfilter
);

route.delete(
  "/:id",
  validate(feedbackValidation.deleteFeedback),
  feedbackController.deleteFeedback
);

module.exports = route;
