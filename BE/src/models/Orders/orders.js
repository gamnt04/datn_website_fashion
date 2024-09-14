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

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    items: [],
    orderNumber: {
      type: String,
      auto: true,
      unique: true
    },
    customerInfo: {
      userName: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      payment: String,
      city: String,
      address: String,
      code: String
    },
    totalPrice: {
      type: Number,
      required: true
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
      }
    ],

    status: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7"], //1.chờ xác nhận, 2.Đang chuẩn bị hàng, 3.Đang vận chuyển, 4. Hoàn thành, 5. Hủy, 6. Giao hàng thành công, 7.Giao hàng thất bại
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
    shipperId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipper"
    },
    confirmationImage: { type: String },
    deliveredAt: {
      type: Date,
      default: null
    },
    completedAt: {
      type: Date,
      default: null
    },
    // datetime: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  { timestamps: true, versionKey: false }
);
// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = generateOrderNumber();
  }
  next();
});
orderSchema.statics.findByOrderNumber = function (orderNumber) {
  return this.findOne({ orderNumber }).exec();
};

orderSchema.plugin(mongoosePaginate);

export default mongoose.model("Order", orderSchema);
