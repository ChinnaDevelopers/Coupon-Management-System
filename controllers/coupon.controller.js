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

  if (validFrom > validTill)
    throw new Error("Valid from date must be less than valid till date");

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

exports.useCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon.validTill < new Date()) {
    return res
      .status(400)
      .json({ success: false, message: "Coupon validity completed" });
  }
  if (coupon.count > 0) {
    await Coupon.findByIdAndUpdate(req.params.id, {
      count: coupon.count - 1,
    });
    res
      .status(200)
      .json({ success: true, message: "Coupon used successfully" });
  } else {
    res.status(400).json({ success: false, message: "Coupon out of stock" });
  }
};
