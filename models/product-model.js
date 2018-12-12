const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    sku: { type: Number, required: true },
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    image: { type: String },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    name: { type: String, required: true },
    size: [{ type: String, required: true }],
    productOwner: { type: Schema.Types.ObjectId },
    // isFreeShipping: { type: Boolean, required: true }
    isVerified: {
      type: String,
      enum: ["verified", "notverified", "refused"],
      default: "notverified"
    }
  },
  {
    timeStamps: true
  }
);

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
