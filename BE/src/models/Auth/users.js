import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    fullName: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    address: [
      {
        fullName: { type: String },
        phoneNumber: { type: String },
        addressDetails: { type: String },
        addressType: { type: String },
      },
    ],
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    avatar: {
      type: String,
      default: "https://vectorified.com/images/default-avatar-icon-12.png",
    },

    birthDate: {
      type: String,
      // get: function (value) {
      //   return value ? value.toISOString().split('T')[0] : undefined;
      // },
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
