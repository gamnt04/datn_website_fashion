import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/connect";
import Routes_Products from "./routers/products";
import Routes_categories from "./routers/category";
import Routes_orders from "./routers/orders";
import Routes_auth from "./routers/auth";
import Routes_blog from "./routers/blogs";
import Routes_Favorites from "./routers/favoriteProducts";
import Routes_Carts from "./routers/cart";
import Router_Contact from "./routers/contact";
import Routes_payments from "./routers/OnlineCheckoutRoutes";
import Routes_review from "./routers/review";
import Router_Notification from "./routers/notification";
import Route_Shipper from "./routers/shipper";
import Routes_voucher from "./routers/voucher";
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import Messages from "./models/Message/Message";
import Router_Message from "./routers/message";
import router_attribute from "./routers/attribute";
import Router_HuyMail from "./routers/sendmail";
import Router_coze from "./routers/coze";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB(process.env.DB_URL);

// Định nghĩa các routes
app.use("/api/v1", Routes_Products);
app.use("/api/v1", Routes_categories);
app.use("/api/v1", Routes_orders);
app.use("/api/v1", Routes_Carts);
app.use("/api/v1", Routes_auth);
app.use("/api/v1", Routes_Favorites);
app.use("/api/v1", Router_Notification);
app.use("/api/v1", Router_Contact);
app.use("/api/v1", Routes_blog);
app.use("/api/v1", Routes_payments);
app.use("/api/v1", Routes_review);
app.use("/api/v1", Route_Shipper);
app.use("/api/v1", Routes_voucher);
app.use("/api/v1", Router_Message);
<<<<<<< HEAD
app.use("/api/v1", Router_HuyMail);
app.use("/api/v1", Router_coze);
=======
app.use("/api/v1", router_attribute);


app.use('/api/v1', Router_HuyMail);
>>>>>>> c74be6578ce1ec93b76ea9ed0b5eb72c5a4643de
// Định nghĩa một số route khác
app.get("/profile/allorder", (req, res) => {
  const amount = req.query.vnp_Amount;
  const responseCode = req.query.vnp_ResponseCode;
  const txnRef = req.query.vnp_TxnRef;
  console.log("Amount: ", amount);
  console.log("Response Code: ", responseCode);
  console.log("Transaction Reference: ", txnRef);
  if (responseCode === "00") {
    res.send("Giao dịch thành công");
  } else {
    res.send("Giao dịch thất bại");
  }
});

// Tạo server HTTP
const server = http.createServer(app);

// Thiết lập Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:7899",
    methods: ["GET", "POST"]
  }
});

// Middleware xác thực JWT cho Socket.IO
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Vui lòng cung cấp token hợp lệ."));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Token không hợp lệ."));
  }
});

// Sự kiện khi có kết nối socket
io.on("connection", (socket) => {
  console.log(`Người dùng kết nối: ${socket.user.userId}`);
  console.log("Client đã kết nối:", socket.id);

  socket.on("send_message", async (data) => {
    const { receiverId, content } = data;

    try {
      const message = new Messages({
        senderId: socket.user.userId,
        receiverId,
        content
      });

      await message.save();
      socket.to(receiverId).emit("receive_message", message);
    } catch (error) {
      console.error("Lỗi khi lưu tin nhắn:", error);
      socket.emit("error", "Gửi tin nhắn thất bại.");
    }
  });

  socket.on("disconnect", () => {
    console.log(`Người dùng ngắt kết nối: ${socket.user.userId}`);
  });
});

// Lắng nghe cổng
const PORT = process.env.PORT || 2004;
server.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});

export const viteNodeApp = app;
