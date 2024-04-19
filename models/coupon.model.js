const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    count: {
      type: Number,
      required: [true, "Count is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount is required"],
    },
    validFrom: {
      type: Date,
      required: [true, "Valid from date is required"],
    },
    validTill: {
      type: Date,
      required: [true, "Valid till date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coupon", couponSchema);
