import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "default category description" },
  image: { type: String, default: "/images/tablets-category.png" },
  attributes: [{ key: { type: String }, value: [{ type: String }] }],
});

const Category = mongoose.model("Category", categorySchema);

categorySchema.index({ description: 1 });

module.exports = Category;
