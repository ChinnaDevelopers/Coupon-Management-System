const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUser,
  logout,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../utils/isLoggedIn");

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => {
  if (req.headers.cookie) {
    if (req.headers.cookie.includes("token")) return res.redirect("/api/user/");
  }
  res.render("login");
});
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", isLoggedIn, getUser);

module.exports = router;
