const User = require("../models/user.model");
const Coupon = require("../models/coupon.model");
const cookieToken = require("../utils/cookieToken");
const { name } = require("ejs");

exports.register = async (req, res) => {
  const { name, organization, email, password } = req.body;

  if (!name) throw new Error("Name is required");
  if (!organization) throw new Error("Organization is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const user = await User.create({
    name,
    organization,
    email,
    password,
  });
  cookieToken(user, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password && req.cookies.token) {
    return res.redirect("/api/user/");
  }

  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const user = await User.findOne({
    email,
  });

  if (!user) throw new Error("Invalid credentials");

  if (!user.comparePassword(password)) throw new Error("Invalid credentials");
  user.password = undefined;
  cookieToken(user, res, "login");
  res.redirect("/api/user/");
};

exports.logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

exports.getUser = async (req, res) => {
  const coupons = await Coupon.find({ user_id: req.user._id }).sort({
    validTill: 1,
  });
  res.status(200).render("dashboard", { user: req.user, coupons });
};

exports.api_keys = async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).render("api", { apis: user.api_keys });
};

exports.createToken = async (req, res) => {
  const user = await User.findById(req.user._id);
  const api = "sk-" + user.createAPIKey(req.body.apiName);
  let key = {
    apiName: req.body.apiName,
    apiKey: api,
    createdAt: new Date(),
  };

  user.api_keys.push(key);
  await user.save();
  res.redirect("/api/user/tokens");
};
