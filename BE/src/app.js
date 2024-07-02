import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/connect";
import categoryRouter from "./routers/categori";
import ordersRouter from "./routers/orders";
import authRouter from "./routers/auth";
import cartRouter from "./routers/cart";
import productRouter from "./routers/products";
import favoriteProductsRouter from "./routers/favoriteProducts";
const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// connectDB
connectDB("mongodb://localhost:27017/DATN");
connectDB(process.env.DB_URI);
// routers
app.use("/api/v1", categoryRouter);
app.use("/api/v1", ordersRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", cartRouter);
app.use("/api/v1", favoriteProductsRouter);
export const viteNodeApp = app;
