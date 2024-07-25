import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
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
        quantity: {
          type: Number,
          required: true,
          default : 1,
        },
        price_item : {
          type : Number,
          required : true
        },
        color_item: String,
        name_size: String,
        quantity_attr : Number,
        total_price_item : Number,
        status_checked : {
          type : Boolean,
          default : true
        }
      }
    ],
    total_price : {
      type : Number,
      default : 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Cart", cartSchema);
