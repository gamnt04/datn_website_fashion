import mongoose from "mongoose";

// Hàm để sinh orderNumber
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}-${random}`;
};

const orderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  items: [orderItemSchema],
  orderNumber: {
    type: String,
    auto: true,
    unique: true,
  },
  customerInfo: {
    type: {
      userName: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
      },
      city: {
        type: String,
      },
      address: {
        type: String
      },
      code: {
        type: String
      }
    },
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Chờ xác nhận", "Đang chuẩn bị hàng", "Đang vận chuyển", "Đã giao hàng", "Đã hủy"],
    default: "Chờ xác nhận"
  },
  datetime: {
    type: Date,
    default: Date.now
  }
});
// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = generateOrderNumber();
  }
  next();
});
export default mongoose.model("Order", orderSchema);
