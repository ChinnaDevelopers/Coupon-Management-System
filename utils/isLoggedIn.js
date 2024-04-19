const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isLoggedIn = async (req, res, next) => {
  if (req.headers.cookie) {
    if (!req.headers.cookie.includes("token"))
      return res.status(400).json({ message: "Please Login First" });

    let token = req.headers.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie.startsWith("token"));
    token = token[0].split("=")[1];
    const user_id = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(user_id._id);
    if (!user) {
      return res.status(404).redirect("/api/user/login");
    }

    req.user = user;
    req.user.password = undefined;
    return next();
  }
  throw new Error("You are not authorized to access this route");
};
