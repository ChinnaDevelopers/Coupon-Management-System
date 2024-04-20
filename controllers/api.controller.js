const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Coupon = require("../models/coupon.model");

exports.api = async (req, res) => {
  const { api_key } = req.params;
  const { category } = req.query;
  if (!api_key) throw new Error("API key is required");
  const decoded = jwt.verify(
    api_key.replace("sk-", ""),
    process.env.API_SECRET
  );

  console.log(req.query.category);

  const coupons = await Coupon.find({
    user_id: decoded._id,
    category,
  });

  res.status(200).json({
    status: 200,
    coupons,
  });
};
