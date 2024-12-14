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
import User from "./models/Auth/users";
import Router_Message from "./routers/message";
import router_attribute from "./routers/attribute";
import Router_HuyMail from "./routers/sendmail";
import Router_coze from "./routers/coze";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
connectDB(process.env.DB_URL);
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
app.use("/api/v1", Router_HuyMail);
app.use("/api/v1", Router_coze);
app.use("/api/v1", router_attribute);
app.use("/api/v1", Router_HuyMail);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:7900", // Thay bằng URL của frontend
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET; // Thay bằng key bí mật của bạn

// Middleware xác thực JWT
const authenticateToken = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error: Token not provided"));
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
    socket.user = user; // Lưu thông tin user vào socket
    next();
  });
};

// Lắng nghe sự kiện kết nối WebSocket
io.use(authenticateToken).on("connection", (socket) => {
  console.log(`User connected: ${socket.id} (${socket.user.username})`);

  // Kiểm tra trạng thái block của user
  const user = User.find((u) => u.id === socket.user.id);
  if (user && user.blocked) {
    // Gửi sự kiện "blocked" tới client
    socket.emit("blocked", { reason: user.reason });
    console.log(`User ${user.username} bị khóa: ${user.reason}`);
  }

  // Lắng nghe sự kiện ngắt kết nối
  socket.on("disconnect", (reason) => {
    console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
  });
});

// API để login và tạo token
app.post("/login", (req, res) => {
  const { username } = req.body;

  const user = User.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Tạo token cho user
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// Start server
server.listen(2004, () => {
  console.log("Server is running on http://localhost:2004");
});

export const getIO = () => io;

export const viteNodeApp = app;
