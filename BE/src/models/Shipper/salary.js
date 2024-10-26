// models/Salary.js
import mongoose from "mongoose";

const SalarySchema = new mongoose.Schema(
  {
    shipperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipper", // Tham chiếu đến model Shipper
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    totalDistance: {
      type: Number,
      default: 0, // Tổng khoảng cách giao hàng
    },
    baseSalary: {
      type: Number,
      default: 0, // Lương cơ bản
    },
    weeklyBonus: {
      type: Number,
      default: 0, // Thưởng hàng tuần
    },
    monthlyBonus: {
      type: Number,
      default: 0, // Thưởng hàng tháng
    },
    totalSalary: {
      type: Number,
      default: 0, // Tổng lương
    },
    dailyRecords: [
      {
        date: {
          type: Date,
          required: true, // Ngày giao hàng
        },
        totalDistance: {
          type: Number,
          default: 0, // Tổng khoảng cách trong ngày
        },
        dailyEarnings: {
          type: Number,
          default: 0, // Lương trong ngày
        },
      },
    ],
  },
  { timestamps: true, versionKey: false } // Tự động thêm trường createdAt và updatedAt
);

// Tạo model từ schema
const Salary = mongoose.model("Salary", SalarySchema);

export default Salary;
