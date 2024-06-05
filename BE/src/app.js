import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/connect";
import categoryRouter from "./routers/categori";
import ordersRouter from "./routers/orders";
import authRouter from "./routers/auth";
import productRouter from "./routers/product";
const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
// connectDB
connectDB(process.env.DB_URI);
// routers
app.use("/api/v1", categoryRouter);
app.use("/api/v1", ordersRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1", productRouter);
export const viteNodeApp = app;
