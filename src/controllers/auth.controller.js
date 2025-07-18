const { createError } = require("../configs/errorConfig");
const { pick } = require("../middlewares/validation");
const {
  authService,
  notificationService,
  KYC_VerificationService,
  logsService,
} = require("../services");
const ObjectId = require("mongoose").Types.ObjectId;

const createUser = async (req, resp, next) => {
  try {
    const user = await authService.createUser(req.body);
    if (user && user.type.length && user.type.includes("rider")) {
      KYC_VerificationService.createKYC_verification({
        rider_id: user._id,
        status: "pending",
      });
    }

    logsService.createLog({
      user_id: user._id,
      type: "audit",
      module: "auth",
      title: "Account created",
      description: "new account created",
    });
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
    await notificationService.sendOTPemail(user.email, {
      otp_code: user.otp,
      user_id: user._id,
      user_name: user.first_name,
    });
    resp.status(200).json({
      status: 200,
      data: {
        token: user.token,
        _id: user._id,
        message: "otp has been sent to your email for validation",
      },
    });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const otp_login = async (req, resp, next) => {
  try {
    const user = await authService.otp_login(req.body);
    resp.status(200).json({ status: 200, data: user });
  } catch (error) {
    return next(createError(error.status || 500, error.message));
  }
};

const resetPassword = async (req, resp, next) => {
  try {
    const user = await authService.resetPassword(req.user._id, req.body);

    logsService.createLog({
      user_id: user._id,
      type: "audit",
      module: "auth",
      title: "password reset",
      description: "user password has been reset",
    });

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
  otp_login,
};
