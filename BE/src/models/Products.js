// models/Products.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    slug: {
      type: String,
      unique: true
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    image: {
      type: String
    },
    gallery: {
      type: [String]
    },
    description: {
      type: String
    },
    countInStock: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    tag: {
      type: [String]
    }
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Products", productSchema);
