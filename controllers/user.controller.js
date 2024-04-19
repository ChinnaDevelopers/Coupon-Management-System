const User = require("../models/user.model");
const Coupon = require("../models/coupon.model");
const jwt = require("jsonwebtoken");
const cookieToken = require("../utils/cookieToken");

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
  if (req.headers.cookie) {
    const id = req.headers.cookie.split("=")[1];
    const user_id = jwt.verify(id, process.env.JWT_SECRET);
    const user = await User.findById(user_id._id).select("-password");
    return res.status(200).json({
      user,
    });
  }
  const { email, password } = req.body;

  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const user = await User.findOne({
    email,
  });

  if (!user) throw new Error("Invalid credentials");

  console.log(user);

  if (!user.comparePassword(password)) throw new Error("Invalid credentials");
  user.password = undefined;
  res.redirect("/api/user/" + user._id);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/api/user/login");
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("User ID is required");
  const user = await User.findById(id).select("-password");
  res.status(200).render("dashboard", { user });
};
