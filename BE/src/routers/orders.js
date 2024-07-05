import { Router } from "express";
import { createOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/Orders/orders";

const Routes_orders = Router()
Routes_orders.post("/orders", createOrder);
Routes_orders.get("/orders", getOrders);
Routes_orders.get("/orders/:userId/:orderId", getOrderById);
Routes_orders.patch("/orders/:userId/:orderId", updateOrderStatus);
export default Routes_orders