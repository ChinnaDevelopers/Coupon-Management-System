const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.token) {
    
    const user_id = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

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
