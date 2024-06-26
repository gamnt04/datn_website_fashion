import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
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
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    price: {
      type: Number,
      required: true,
      default: 0
    },
    thumbnail: {
      type: String,
      required: true
    },
    gallery: {
      type: Array
    },
    description: {
      type: String,
      required: true
    },
    discount: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array
    }
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model("Product", productSchema);
