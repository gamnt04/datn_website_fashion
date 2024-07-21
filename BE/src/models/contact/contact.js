import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
        },
    message: {
        type: String,
        required: true
    },
},
  {
    timestamps: true,
    versionKey: false //Loại bỏ versionKey tự động tạo
  }
);

export default mongoose.model("Contact", contactSchema);
