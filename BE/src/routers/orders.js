import { Router } from "express";
import {
  createOrder,
  getOneOrderUser,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/Orders/orders";

const router = Router();
router.post("/orders", createOrder);
router.get("/orders", getOrders);
router.post("/orders/get_order_user", getOneOrderUser);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrderStatus);
export default router
