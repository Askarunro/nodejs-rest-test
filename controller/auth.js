const { registration, login, logout, current, update } = require("../service/auth");
const { uploadImage } = require("../service/image");

const { schemaRegister } = require("../service/schemas/users");

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await registration(email, password);
    if (result && schemaRegister.validate(email, password)) {
      return res.json({
        status: "created",
        code: 201,
        data: { user: result },
      });
    }
    return res.json({
      status: "conflict",
      code: 409,
      message: `Email in use`,
    });
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  const { email, subscription = "starter" } = req.body;
  try {
    const result = await login(req.body);
    return res.json({
      status: "success",
      code: 200,
      token: result,
      user: {
        email: email,
        subscription: subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await logout(req.user._id);
    res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};

const currentUser = async (req, res, next) => {
  try {
    await current(req.user._id);
    return res.json({
      status: "success",
      code: 200,
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const avatarsUser = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const avatarURL = await uploadImage(id, req.file);
    const user = await update(id, avatarURL);
    return res.json({
      status: "success",
      code: 200,
      user: {
        email: req.user.email,
        subscription: req.user.subscription,
        avatar: avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { registerUser, loginUser, logoutUser, currentUser, avatarsUser };
