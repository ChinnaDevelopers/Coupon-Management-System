const Coupon = require("../models/coupon.model");

exports.createCoupon = async (req, res) => {
  const { name, count, category, description, discount, validFrom, validTill } =
    req.body;

  if (!name) throw new Error("Name is required");
  if (!count) throw new Error("Count is required");
  if (!category) throw new Error("Category is required");
  if (!description) throw new Error("Description is required");
  if (!discount) throw new Error("Discount is required");
  if (!validFrom) throw new Error("Valid from date is required");
  if (!validTill) throw new Error("Valid till date is required");
  const user_id = req.user._id;

  await Coupon.create({
    name,
    user_id,
    count,
    category,
    description,
    discount,
    validFrom,
    validTill,
  });
  res.status(201).redirect("/api/user/");
};

exports.updateCoupon = async (req, res) => {
  const { name, count, category, description, discount, validFrom, validTill } =
    req.body;

  if (!name) throw new Error("Name is required");
  if (!count) throw new Error("Count is required");
  if (!category) throw new Error("Category is required");
  if (!description) throw new Error("Description is required");
  if (!discount) throw new Error("Discount is required");
  if (!validFrom) throw new Error("Valid from date is required");
  if (!validTill) throw new Error("Valid till date is required");

  await Coupon.findByIdAndUpdate(
    req.params.id,
    {
      name,
      count,
      category,
      description,
      discount,
      validFrom,
      validTill,
    },
    {
      runValidators: true,
    }
  );
  res.status(200).redirect("/api/user/");
};

exports.getCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  const validFrom = coupon.validFrom.toISOString().slice(0, 16);
  const validTill = coupon.validTill.toISOString().slice(0, 16);
  res
    .status(200)
    .render("updateCoupon", { user: req.user, coupon, validFrom, validTill });
};
