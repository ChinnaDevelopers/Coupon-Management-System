const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getCoupon,
  updateCoupon,
  useCoupon,
  deleteCoupon,
} = require("../controllers/coupon.controller");
const { isLoggedIn } = require("../utils/isLoggedIn");

/**
 * @swagger
 * /use/{id}:
 *   post:
 *     tags:
 *       - Coupon
 *     description: Use coupon
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
router.post("/use/:id", useCoupon);

router.use(isLoggedIn);

/**
 * @swagger
 * /create:
 *   get:
 *     tags:
 *       - Coupon
 *     description: Render create coupon page
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/create", (req, res) =>
  res.status(200).render("createCoupon", { user: req.user, coupon: req.coupon })
);

/**
 * @swagger
 * /create:
 *   post:
 *     tags:
 *       - Coupon
 *     description: Create coupon
 *     responses:
 *       200:
 *         description: Success
 */
router.post("/create", createCoupon);

/**
 * @swagger
 * /update/{id}:
 *   post:
 *     tags:
 *       - Coupon
 *     description: Update coupon
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
router.post("/update/:id", updateCoupon);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     tags:
 *       - Coupon
 *     description: Delete coupon
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
router.delete("/delete/:id", deleteCoupon);

/**
 * @swagger
 * /{id}:
 *   get:
 *     tags:
 *       - Coupon
 *     description: Get coupon
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
router.get("/:id", getCoupon);
module.exports = router;
