const Joi = require("joi");
const { objectId } = require("../utils");

const getDocumentById = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const deleteDocument = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const findAndFilterDocuments = {
  body: Joi.object().keys({
    sortBy: Joi.string().allow("", null).default(""),
    limit: Joi.number().default(10),
    page: Joi.number().default(0),
    search: Joi.string().allow("", null).default(""),
    match_values: Joi.object().allow(null).default(null),
  }),
};

module.exports = {
  getDocumentById,
  deleteDocument,
  findAndFilterDocuments,
};
