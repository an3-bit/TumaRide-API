const Joi = require("joi");
const { objectId } = require("../utils");

const createPackage = {
  body: Joi.object().keys({
    sender_id: Joi.string().custom(objectId).allow(null),
    rider_id: Joi.string().custom(objectId).allow(null),
    type: Joi.string().valid("fragile", "perishable", "normal").required(),
    size: Joi.string().valid("small", "medium", "large").required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    cost: Joi.number().default(0),
    from: Joi.object()
      .keys({
        name: Joi.string().required(),
        coordinates: Joi.array()
          .items(Joi.number())
          .length(2)
          .required()
          .messages({
            "array.length":
              "From coordinates must contain exactly 2 numbers (longitude, latitude)",
          }),
      })
      .required(),
    to: Joi.object()
      .keys({
        name: Joi.string().required(),
        coordinates: Joi.array()
          .items(Joi.number())
          .length(2)
          .required()
          .messages({
            "array.length":
              "To coordinates must contain exactly 2 numbers (longitude, latitude)",
          }),
      })
      .required(),
  }),
};

const updatePackage = {
  body: Joi.object().keys({
    sender_id: Joi.string().custom(objectId).allow(null),
    rider_id: Joi.string().custom(objectId).allow(null),
    type: Joi.string().valid("fragile", "perishable", "normal"),
    size: Joi.string().valid("small", "medium", "large"),
    title: Joi.string(),
    description: Joi.string(),
    cost: Joi.number(),
    from: Joi.object().keys({
      name: Joi.string(),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }),
    to: Joi.object().keys({
      name: Joi.string(),
      coordinates: Joi.array().items(Joi.number()).length(2),
    }),
    delivery_status: Joi.string().valid("pending", "inProgress", "delivered"),
    payment_status: Joi.string().valid("pending", "completed"),
    sender_payment_status: Joi.string().valid("pending", "completed"),
    rider_payment_status: Joi.string().valid("pending", "completed"),
  }),
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const packageById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
const deletePackage = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
const findAndFilterPackages = {
  body: Joi.object().keys({
    sortBy: Joi.string().allow("", null).default(""),
    limit: Joi.number().default(10),
    page: Joi.number().default(0),
    search: Joi.string().allow("", null).default(""),
    match_values: Joi.object().allow(null).default(null),
  }),
};

module.exports = {
  createPackage,
  updatePackage,
  findAndFilterPackages,
  packageById,
  deletePackage,
};
