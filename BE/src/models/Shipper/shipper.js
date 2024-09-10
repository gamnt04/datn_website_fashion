import mongoose from "mongoose";

// Điều kiện đầu số hợp lệ cho số điện thoại Việt Nam
const phoneRegex = /^(03|05|07|08|09)\d{8}$/;

const validatePhoneNumber = (phone) => {
  return phoneRegex.test(phone); // Kiểm tra số điện thoại theo định dạng Việt Nam
};

const ShipperSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Tên shipper
    phone: {
      type: String,
      required: true,
      validate: {
        validator: validatePhoneNumber, // Kiểm tra số điện thoại
        message: (props) => `${props.value} không phải là số điện thoại hợp lệ`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email không hợp lệ"], // Kiểm tra định dạng email
    },
    password: {
      type: String,
      required: true,
    }, // Mật khẩu mặc định
    avatar: {
      type: String,
      default: "https://vectorified.com/images/default-avatar-icon-12.png",
      // default: "../upload/default-avatar.jpeg",
    },
    status: {
      type: String,
      required: true,
      enum: ["On delivery", "Available", "Offline"], // Trạng thái shipper
      default: "Available",
    },
    vehicle: { type: String }, // Phương tiện
    token: { type: String }, // Thêm trường token
    tokenExpiration: { type: Date }, // Thêm trường ngày hết hạn của token/ Token để xác minh email

    role: {
      type: String,
      enum: ["courier"],
      default: "courier",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Shipper", ShipperSchema);
