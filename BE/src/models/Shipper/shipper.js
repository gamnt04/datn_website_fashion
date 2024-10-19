import mongoose from "mongoose"; // Thêm dòng này ở đầu tệp

const ShipperSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    userName: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: validatePhoneNumber,
        message: (props) => `${props.value} không phải là số điện thoại hợp lệ`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email không hợp lệ"],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "https://vectorified.com/images/default-avatar-icon-12.png",
    },
    status: {
      type: String,
      required: true,
      enum: ["Available", "Offline"],
      default: "Offline",
    },
    vehicle: { type: String },
    token: { type: String },
    tokenExpiration: { type: Date },
    address: [
      {
        fullName: { type: String },
        phoneNumber: { type: String },
        address: { type: String },
        addressDetails: { type: String },
        checked: { type: Boolean, default: false },
      },
    ],
    birthDate: {
      type: String,
    },
    role: {
      type: String,
      enum: ["courier"],
      default: "courier",
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Shipper", ShipperSchema);
