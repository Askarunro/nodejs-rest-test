const { Users } = require("./schemas/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("..//helpers/env");
const { ValidationError } = require("../helpers/errors");

const registration = async (email, password) => {
  const result = await Users.findOne({ email: email });
  if (result) {
    return;
  }
  const pass = password;
  const hashedPassword = await bcrypt.hash(pass, 10);
  const user = await Users.create({ email, password: hashedPassword });
  return user;
};

const login = async ({ email, password }) => {
  const user = await Users.findOne({ email: email });
  if(user && !user.verify){
    throw new ValidationError(401, "Please confirm your email");
  }
  if (!user) {
    throw new ValidationError(401, "Email or password is wrong");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new ValidationError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
    role: user.subscription,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await Users.findByIdAndUpdate(user.id, { token });
  return token;
};

const authenticateUser = async (token) => {
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    const { id } = payload;
    return await Users.findById(id);
  } catch (e) {
    return null;
  }
};

const logout = async (id) => {
  await Users.findByIdAndUpdate(id, { token: null });
};

const current = async (contactId) => {
  return Users.findOne(contactId);
};

const update = async (id, data) => {
  return Users.findByIdAndUpdate(id, data, { new: true });
};

const find = async (filters) => {
 return Users.findOne(filters);
};

module.exports = {
  registration,
  login,
  logout,
  current,
  authenticateUser,
  update,
  find,
};
