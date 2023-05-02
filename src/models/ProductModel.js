import mongoose from "mongoose";
import Review from "./ReviewModel";

const imageSchema = mongoose.Schema({
  url: { type: String, required: true },
  alt: { type: String },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    reviewsNumber: {
      type: Number,
    },
    sales: {
      type: Number,
      default: 0,
    },
    attributes: [{ key: String, value: String }],
    images: [imageSchema],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

// to search faster in database
productSchema.index(
  { name: "text", description: "text" },
  { name: "TextIndex" }
);

productSchema.index({ "attributes.key": 1, "attributes.value": 1 });

export default Product;
