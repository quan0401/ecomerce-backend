import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      name: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
