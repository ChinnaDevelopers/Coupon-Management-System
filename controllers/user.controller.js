const User = require("../models/user.model");
const Coupon = require("../models/coupon.model");
const cookieToken = require("../utils/cookieToken");

exports.register = async (req, res) => {
  const { name, organization, email, password } = req.body;

  if (!name) throw new Error("Name is required");
  if (!organization) throw new Error("Organization is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const user = await User.create(
    {
      name,
      organization,
      email,
      password,
    },
    { runValidators: true }
  );
  cookieToken(user, res);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password && req.headers.cookie) {
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
  res.clearCookie("token");
  res.redirect("/api/user/login");
};

exports.getUser = async (req, res) => {
  const coupons = await Coupon.find({ user_id: req.user._id }).sort({
    validTill: 1,
  });
  res.status(200).render("dashboard", { user: req.user, coupons });
};
