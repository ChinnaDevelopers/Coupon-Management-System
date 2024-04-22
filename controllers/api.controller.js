const jwt = require("jsonwebtoken");
const Coupon = require("../models/coupon.model");

exports.api = async (req, res) => {
  const { api_key } = req.params;

  if (!api_key) throw new Error("API key is required");

  const decoded = jwt.verify(
    api_key.replace("sk-", ""),
    process.env.API_SECRET
  );

  const coupons = await Coupon.find({
    user_id: decoded._id,
    ...req.query,
  }).select("-user_id -__v -createdAt -updatedAt");

  res.status(200).render("use_api", { coupons });
};
