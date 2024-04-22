const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUser,
  logout,
  api_keys,
  createAPIkey,
  verifyUser,
  verifyPhone,
  verifyOTP,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../utils/isLoggedIn");

router.get("/register", (req, res) => res.render("register"));
router.get("/login", (req, res) => {
  if (req.cookies.token) return res.redirect("/api/user");
  res.render("login");
});
router.post("/register", register);
router.post("/login", login);

// router.get("/verify", verifyOTP);

router.get("/verify/:token", (req, res) =>
  res.status(200).render("verify", { token: req.params.token })
);
router.post("/verify/:token", verifyOTP);

// router.get("/verifyPhone/:token", verifyPhone);

router.use(isLoggedIn);
router.get("/", getUser);
router.get("/logout", logout);
router.get("/api_keys", api_keys);
router.post("/api_keys", createAPIkey);

module.exports = router;
