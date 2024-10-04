import mongoose from "mongoose";
const VoucherSchema = new mongoose.Schema(
  {
    name_voucher: { type: String, required: true },
    code_voucher: { type: String, required: true, unique: true },
    description_voucher: { type: String, required: true },
    quantity_voucher: {
      type: Number,
      default: 1, // Số lượng voucher có thể được sử dụng
    },
    usedCount: {
      type: Number,
      default: 0, // Số lần voucher đã được sử dụng
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"], //select 2 cái ra
      required: true,
    }, //Loại giảm giá % hoặc trừ bao nhiêu tiền
    discountValue: { type: Number, required: true }, // Giá trị giảm giá
    minimumSpend: { type: Number }, // Số tiền tối thiểu để có thể sử dụng được voucher
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Liên kết tới bảng người dùng (User)
      },
    ], //
    startDate: {
      type: Date,
      default: Date.now,
    }, //Ngày bắt đầu
    expirationDate: { type: Date, required: true }, // Ngày hết hạn
    isActive: { type: Boolean, default: true }, // Voucher còn khả dụng không
  },
  { timestamps: true }
);
export default mongoose.model("Voucher", VoucherSchema);
