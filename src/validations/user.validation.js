const Joi = require("joi");
const { objectId } = require("../utils");

const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must be alphanumeric and between 3 to 30 characters.",
        "string.empty": "Password is required.",
      }),
    repeat_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Passwords do not match.", // Custom error message for mismatch
        "string.empty": "Repeat password is required.",
      }),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    type: Joi.array().items(Joi.string().valid("sender", "rider")).required(),
  }),
};

const createStaff = {
  body: Joi.object().keys({
    first_name: Joi.string().alphanum().required(),
    last_name: Joi.string().alphanum().required(),
    super_admin_id: Joi.string().custom(objectId).required(),
    role: Joi.string()
      .valid("Super Admin", "Admin", "Branch Manager", "Staff")
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required()
      .messages({
        "string.pattern.base":
          "Password must be alphanumeric and between 3 to 30 characters.",
        "string.empty": "Password is required.",
      }),
    repeat_password: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.only": "Passwords do not match.", // Custom error message for mismatch
        "string.empty": "Repeat password is required.",
      }),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    branches: Joi.array().items(
      Joi.object({
        branch_id: Joi.string().custom(objectId).required(),
        role: Joi.string()
          .valid("Super Admin", "Admin", "Branch Manager", "Staff")
          .required(),
      })
    ),
  }),
};

const login = {
  body: Joi.object().keys({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  }),
};

const updateUser = {
  body: Joi.object().keys({
    first_name: Joi.string().alphanum(),
    is_deleted: Joi.boolean(),
    last_name: Joi.string().alphanum(),
    password: Joi.string(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    __v: Joi.number(),
    branches: Joi.array().items(
      Joi.object({
        branch_id: Joi.string().custom(objectId).required(),
        role: Joi.string()
          .valid("Super Admin", "Admin", "Branch Manager", "Staff")
          .required(),
      })
    ),
    super_admin_id: Joi.string().custom(objectId),
    _id: Joi.string().custom(objectId),
    role: Joi.string().valid("Super Admin", "Admin", "Branch Manager", "Staff"),
  }),
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

const findandfilter = {
  body: Joi.object().keys({
    sortBy: Joi.string().allow("", null).default(""),
    limit: Joi.number().default(10),
    page: Joi.number().default(0),
    search: Joi.string().allow("", null).default(""),
    match_values: Joi.object().allow(null).default(null),
  }),
};

module.exports = {
  createUser,
  login,
  updateUser,
  updateUser,
  resetPassword,
  createStaff,
  findandfilter,
};
