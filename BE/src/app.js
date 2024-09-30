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
import Routes_Attribute from "./routers/attribute";
import Routes_review from "./routers/review";
import Router_Notification from "./routers/notification";
import Route_Shipper from "./routers/shipper";
import Routes_voucher from "./routers/voucher";
import { Server } from "socket.io"; // <--- Đã bổ sung
import http from "http"; // <--- Đã bổ sung
import jwt from "jsonwebtoken"; // <--- Đã bổ sung
import Messages from "./models/Message/message"; // <--- Đã bổ sung

dotenv.config(); // <--- Di chuyển lên trước
const app = express();

app.use(express.json());
app.use(cors());

connectDB(process.env.DB_URL); // Kết nối DB trước

// Định nghĩa các routes
app.use("/api/v1", Routes_Products);
app.use("/api/v1", Routes_Attribute);
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

// Định nghĩa một số route khác
app.get("/profile/allorder", (req, res) => {
  const amount = req.query.vnp_Amount;
  const responseCode = req.query.vnp_ResponseCode;
  const txnRef = req.query.vnp_TxnRef;
  console.log("Amount: ", amount);
  console.log("Response Code: ", responseCode);
  console.log("Transaction Reference: ", txnRef);
  if (responseCode === "00") {
    res.send("Transaction successful");
  } else {
    res.send("Transaction failed");
  }
});

// Tạo server HTTP
const server = http.createServer(app);

// Khởi tạo Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:7899", // Cần đảm bảo client chạy trên địa chỉ này
    methods: ["GET", "POST"],
  },
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
  console.log(`User connected: ${socket.user.userId}`);

  // Lắng nghe sự kiện gửi tin nhắn từ client
  socket.on("send_message", async (data) => {
    const { receiverId, content } = data;

    // Lưu tin nhắn vào cơ sở dữ liệu
    const message = new Messages({
      senderId: socket.user.userId,
      receiverId,
      content,
    });

    await message.save(); // Lưu tin nhắn vào DB

    // Gửi tin nhắn tới người nhận
    io.to(receiverId).emit("receive_message", message);
  });

  // Xử lý sự kiện ngắt kết nối
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.user.userId}`);
  });
});

// Lắng nghe trên cổng
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export const viteNodeApp = app;
