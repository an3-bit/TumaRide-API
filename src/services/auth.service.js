const createUser = async (body) => {
  let password = body.password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  body.password = hash;

  try {
    const user = new User(body);
    const currentDate = new Date();
    const expiresAt = new Date(
      currentDate.getTime() + 30 * 24 * 60 * 60 * 1000
    ); // 30 days in milliseconds

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
  const user = await User.findOne({ email: body.email });
  if (!user) {
    throw createError(400, "Email with that account does not exist.");
  }
  const isPassword = bcrypt.compareSync(body.password, user.password); // true
  if (!isPassword) {
    throw createError(401, "Incorrect email or password.");
  }
  const token = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      role: user.role,
      subscription: { status: user.subscription },
    },
    process.env.JWT_KEY
  );
  const { password, ...other } = user._doc;
  other.subscription = { status: user.subscription };
  return { status: 200, data: { token, ...other } };
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
};
