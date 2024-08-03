import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
  items: [],
  orderNumber: {
    type: String,
    auto: true,
    unique: true,
  },
  customerInfo: {
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
    payment: String,
    city: String,
    address: String,
    code: String,
  },
  totalPrice: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    default: "1"
  },
  cancellationRequested: {
    type: Boolean,
    default: false
  },
  cancelledByAdmin: {
    type: Boolean,
    default: false
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
orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
