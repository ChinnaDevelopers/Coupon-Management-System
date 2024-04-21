const User = require("../models/user.model");
const Coupon = require("../models/coupon.model");
const cookieToken = require("../utils/cookieToken");
const sendMail = require("../utils/sendMail");
const sendSMS = require("../utils/sendSMS");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, organization, email, phone, password } = req.body;

  if (!name) throw new Error("Name is required");
  if (!organization) throw new Error("Organization is required");
  if (!email) throw new Error("Email is required");
  if (!phone) throw new Error("Phone is required");
  if (!password) throw new Error("Password is required");
  if (password.length < 6)
    throw new Error("Password must be atleast 6 characters long");

  const dup = await User.findOne({ email });
  if (dup) throw new Error("Email already exists");

  const user = await User.create({
    name,
    organization,
    email,
    phone,
    password,
  });
  const token = user.createJWTToken();
  let url = `${process.env.URL}/api/user/verify/` + token;
  sendMail(
    email,
    "Verification for Coupon System API",
    `Hello ${name}, <a href="${url}">Verify</a> your email`
  );
  url = `${process.env.URL}/api/user/verifyPhone/` + token;
  sendSMS(phone, `Hello ${name}, verify your email at ${url}`);
  res.status(200).render("message", {
    message: "Verify email and phone and then login to continue",
    error: false,
  });
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

  if (!user) throw new Error("User not found");
  if (!user.comparePassword(password)) throw new Error("Invalid credentials");
  if (!user.verified)
    throw new Error("Email not verified, please verify first");
  if (!user.phone_verified)
    throw new Error("Phone not verified, please verify");
  user.password = undefined;
  cookieToken(user, res);
  res.redirect("/api/user/");
};

exports.logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).redirect("/api/user/login");
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

exports.createAPIkey = async (req, res) => {
  const user = await User.findById(req.user._id);
  const api = "sk-" + user.createAPIKey(req.body.apiName);
  let key = {
    apiName: req.body.apiName,
    apiKey: api,
    createdAt: new Date(),
  };

  user.api_keys.push(key);
  await user.save();
  res.redirect("/api/user/api_keys");
};

exports.verifyUser = async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new Error("Invalid token");
  const user = await User.findById(decoded._id);

  if (!user) throw new Error("User not found");
  if (user.verified)
    throw new Error(
      `Email already verified, please visit ${process.env.URL}/api/user/login to login`
    );
  user.verified = true;
  await user.save();
  res.status(200).render("message", {
    message: `Email verified, please visit ${process.env.URL}/api/user/login to login`,
    error: false,
  });
};

exports.verifyPhone = async (req, res) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);

  if (user.phone_verified) throw new Error("Phone already verified");
  user.verifyPhone();
  res.status(200).render("message", {
    message: "Phone verified",
    error: false,
  });
};
