import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseDelete from "mongoose-delete";

const productSchema = new mongoose.Schema(
  {
    name_product: {
      type: String,
      required: true,
      trim: true,
    },
    // slug: {
    //   type: String,f
    //   unique: true
    // },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    price_product: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    image_product: {
      type: String,
      required: true,
    },
    gallery_product: {
      type: [String],
    },
    description_product: {
      type: String,
      minlength: 6,
      maxlength: 5000,
    },
    stock_product: {
      type: Number,
      default: 1,
    },
    stock: Number,
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attributes'
      }
    ],
    featured_product: {
      type: Boolean,
      default: false,
    },
    tag_product: {
      type: [String],
    },
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);
productSchema.plugin(
  mongooseDelete,
  { deletedAt: true },
  { overrideMethods: "all" }
);

export default mongoose.model("Products", productSchema);
