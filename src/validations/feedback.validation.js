const Joi = require("joi");
const { objectId } = require("../utils");

const createFeedback = {
  body: Joi.object().keys({
    rider_id: Joi.string().custom(objectId).allow(null),
    title: Joi.string().required(),
    description: Joi.string().required(),
    ratting: Joi.number().min(0).max(5).default(0), // assuming rating is between 0-5
  }),
};

const updateFeedback = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    rider_id: Joi.string().custom(objectId).allow(null),
    title: Joi.string(),
    description: Joi.string(),
    ratting: Joi.number().min(0).max(5),
  }),
};

const getFeedbackById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const deleteFeedback = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const findAndFilterFeedback = {
  body: Joi.object().keys({
    sortBy: Joi.string().allow("", null).default(""),
    limit: Joi.number().default(10),
    page: Joi.number().default(0),
    search: Joi.string().allow("", null).default(""),
    match_values: Joi.object().allow(null).default(null),
  }),
};

module.exports = {
  createFeedback,
  updateFeedback,
  getFeedbackById,
  deleteFeedback,
  findAndFilterFeedback,
};
