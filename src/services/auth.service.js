const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { User } = require("../models");
const { createError } = require("../configs/errorConfig.js");
const { ObjectId } = require("mongodb");

function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}
function generateOtphash(otp) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(otp, salt);
  return hash;
}

const createUser = async (body) => {
  let password = body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  body.password = hash;

  try {
    const user = new User(body);
    return await user.save();
  } catch (error) {
    if (error?.errorResponse?.code === 11000) {
      throw createError(400, "Account with that email exists.");
    } else {
      console.log(error);
      throw new Error(error);
    }
  }
};

const login = async (body) => {
  let user = await User.findOne({ email: body.email });
  if (!user) {
    throw createError(400, "Email with that account does not exist.");
  }
  const isPassword = bcrypt.compareSync(body.password, user.password); // true
  if (!isPassword) {
    throw createError(401, "Incorrect email or password.");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_KEY
  );
  let otp = generateOtp();
  console.log(otp);
  let otp_hash = generateOtphash(otp);
  user = await User.findByIdAndUpdate(
    new ObjectId(user._id),
    { otp_verification: false, otp_hash },
    { new: true }
  );

  return {
    token,
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    otp,
    email: user.email,
  };
};

const otp_login = async (body) => {
  let user = await User.findById(new ObjectId(body.user_id));
  if (!user) {
    throw createError(400, "invalid user");
  }
  console.log(user, body.otp);
  const isValidOtp = bcrypt.compareSync(body.otp, user.otp_hash); // true | false
  if (!isValidOtp) {
    throw createError(401, "Invalid otp or otp expired.");
  }
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_KEY,
    {
      expiresIn: "1h",
    }
  );
  user = await User.findByIdAndUpdate(
    user._id,
    { otp_verification: true, otp_hash: "" },
    { new: true }
  );
  const { password, otp_hash, ...other } = user._doc;

  return { token, ...other };
};

const resetPassword = async (id, body) => {
  let password = body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  let newPassword = hash;

  const user = await User.findByIdAndUpdate(
    new ObjectId(id),
    { $set: { password: newPassword } },
    { new: true }
  );
  return user;
};

module.exports = {
  createUser,
  login,
  resetPassword,
  otp_login,
};
