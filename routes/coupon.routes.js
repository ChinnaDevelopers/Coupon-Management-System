const express = require("express");
const router = express.Router();

const {
  createCoupon,
  getCoupon,
  updateCoupon,
  useCoupon,
} = require("../controllers/coupon.controller");
const { isLoggedIn } = require("../utils/isLoggedIn");

router.post("/use/:id", useCoupon);
router.use(isLoggedIn);

router.get("/create", (req, res) =>
  res.status(200).render("createCoupon", { user: req.user, coupon: req.coupon })
);
router.post("/create", createCoupon);
router.post("/update/:id", updateCoupon);
router.get("/:id", getCoupon);
module.exports = router;
