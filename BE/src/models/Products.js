import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    category_id: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
    },
    gallery: {
      type: Array,
    },
    description: {
      type: String,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: 0 }
);

export default mongoose.model("Products", productSchema);
