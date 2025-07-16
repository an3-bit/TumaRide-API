const { createError } = require("../configs/errorConfig.js");
const { User } = require("../models/index.js");

const { ObjectId } = require("mongodb");

const updateUser = async (id, body) => {
  const userData = await User.findOne({ _id: new ObjectId(id) });
  if (!userData) {
    throw createError(400, "Invalid user id");
  }

  const user = await User.findByIdAndUpdate(
    new ObjectId(id),
    { $set: body },
    { new: true }
  );
  const { password, ...other } = user._doc;
  return other;
};

const getauthUser = async (userid) => {
  const user = await User.findById(new ObjectId(userid));

  if (!user) {
    throw createError(404, "user not found!");
  }
  const { password, ...other } = user._doc;
  return { ...other, subscription: { status: user.subscription } };
};

const findandfilter = async (filter, options) => {
  const user = await User.paginate(filter, options);
  if (!user) {
    throw createError(404, "user not found.");
  }
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndUpdate(new ObjectId(id), {
    $set: { is_deleted: true },
  });

  return user;
};
module.exports = {
  updateUser,

  getauthUser,
  findandfilter,
  deleteUser,
};
