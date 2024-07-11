import { Router } from "express";
import {
  createOrder,
  get_orders_client,
  getOneOrderUser,
  getOrderById,
  updateOrderStatus,
} from "../controllers/Orders/orders";

const router = Router();
router.post("/orders", createOrder);
router.get("/orders", get_orders_client);
// router.get("/orders", getOrders);
router.post("/orders/get_order_user", getOneOrderUser);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrderStatus);
export default router
