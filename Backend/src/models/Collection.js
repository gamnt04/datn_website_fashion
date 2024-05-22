import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    slug: {
      type: String,
      slug: "name",
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Collection", collectionSchema);
