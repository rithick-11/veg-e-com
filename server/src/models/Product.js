const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required."],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required."],
    },
    // Price per unit (e.g., per kg, per piece)
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Price cannot be negative."],
    },
    unit: {
      type: String,
      enum: ["kg", "g", "piece", "bunch", "dozen"],
      default: "kg",
    },
    discountPercentage: {
      type: Number,
      min: [0, "Discount percentage cannot be negative."],
      max: [100, "Discount percentage cannot be more than 100."],
      default: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required."],
      min: [0, "Stock cannot be negative."],
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
      // Example categories for a vegetable store
      enum: [
        "Leafy Green",
        "Root Vegetables",
        "Cruciferous",
        "Marrow",
        "Stem",
        "Alliums",
        "Fruits", // Some vegetables are botanically fruits
        "Herbs",
      ],
    },
    images: {
      type: [String],
      validate: [
        (v) => Array.isArray(v) && v.length > 0,
        "Product must have at least one image.",
      ],
    },
    isOrganic: {
      type: Boolean,
      default: false,
    },
    origin: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual property to calculate the final price after discount
productSchema.virtual("finalPrice").get(function () {
  if (this.discountPercentage > 0) {
    return this.price * (1 - this.discountPercentage / 100);
  }
  return this.price;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;