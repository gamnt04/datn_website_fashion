import mongoose, { Schema } from "mongoose";

export const favoriteProductSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Products",
          required: true
        },
        status: {
          type: String,
          enum: ["available", "unavailable"],
          default: "available"
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);
export default mongoose.model("FavoriteProducts", favoriteProductSchema);
