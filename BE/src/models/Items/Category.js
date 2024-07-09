import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    name_category: {
      type: String,
      required: true,
      // unique: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
    ]
    // ,
    // slug: {
    //   type: String,
    //   slug: "name",
    //   unique: true,
    // },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);
export default mongoose.model("Category", categorySchema);
