const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUser,
  logout,
  api_keys,
  createToken,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../utils/isLoggedIn");

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => {
  if (req.cookies.token) return res.redirect("/api/user");
  res.render("login");
});
router.post("/register", register);
router.post("/login", login);

router.use(isLoggedIn);
router.get("/", getUser);
router.get("/logout", logout);
router.get("/api_keys", api_keys);
router.post("/tokens", createToken);

module.exports = router;
