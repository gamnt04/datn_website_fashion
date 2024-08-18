import mongoose from "mongoose";

const reviewProductSchema = new mongoose.Schema({
  content: {
    imagesReview: { type: [String], default: [] },
    videoReview: { type: String, default: "" },
    contentReview: { type: String, required: true },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export default mongoose.model(
  "ReviewProduct",
  reviewProductSchema,
  "ReviewProduct"
);
