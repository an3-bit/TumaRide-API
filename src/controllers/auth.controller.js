const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const { authService } = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createUser = async (req, resp, next) => {
  try {
    const user = await authService.createUser(req.body);
    resp
      .status(200)
      .json({ status: 200, data: { message: "New account created" } });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const login = async (req, resp, next) => {
  try {
    const user = await authService.login(req.body);
    resp.status(200).json(user);
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const resetPassword = async (req, resp, next) => {
  try {
    const user = await authService.resetPassword(req.user._id, req.body);

    resp.status(200).json({
      status: 200,
      data: { success: true, message: "password reset" },
    });
  } catch (error) {
    console.log(error);
    return next(createError(error.status || 500, error.message));
  }
};

module.exports = {
  createUser,
  login,
  resetPassword,
};
