const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getUser,
  logout,
  api_keys,
  createAPIkey,
  verifyOTP,
  deleteUser,
  updateUser,
} = require("../controllers/user.controller");
const { isLoggedIn } = require("../utils/isLoggedIn");

/**
 * @swagger
 * /register:
 *   get:
 *     tags:
 *       - User
 *     description: Render register page
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/register", (req, res) => res.render("register"));

/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - User
 *     description: Render login page
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/login", (req, res) => {
  if (req.cookies.token) return res.redirect("/api/user");
  res.render("login");
});

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - User
 *     description: Register user
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/register", register);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     description: Login user
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/login", login);

/**
 * @swagger
 * /verify/{token}:
 *   get:
 *     tags:
 *       - Verification
 *     description: Render verification page
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/verify/:token", (req, res) =>
  res.status(200).render("verify", { token: req.params.token })
);

/**
 * @swagger
 * /verify/{token}:
 *   post:
 *     tags:
 *       - Verification
 *     description: Verify OTP
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/verify/:token", verifyOTP);

router.use(isLoggedIn);

/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - User
 *     description: Get user
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/", getUser);

router.get("/logout", logout);

/**
 * @swagger
 * /api_keys:
 *   get:
 *     tags:
 *       - API Keys
 *     description: Get API keys
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/api_keys", api_keys);

/**
 * @swagger
 * /api_keys:
 *   post:
 *     tags:
 *       - API Keys
 *     description: Create API key
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/api_keys", createAPIkey);

/**
 * @swagger
 * /{id}:
 *   post:
 *     tags:
 *       - User
 *     description: Update user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/:id", updateUser);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     tags:
 *       - User
 *     description: Delete user
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.delete("/:id", deleteUser);

module.exports = router;
