import { Router } from "express";
import { createOrder, getOneOrderUser, getOrderById, getOrders, updateOrderStatus } from "../controllers/Orders/orders";

const router = Router()
router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.get("/orders/:userId/:orderId", getOrderById);
router.get("/orders/:userId", getOneOrderUser);
router.patch("/orders/:userId/:orderId", updateOrderStatus);
export default router

