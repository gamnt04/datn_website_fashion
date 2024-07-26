import { Router } from "express";
import {
  adminCancelOrder,
  createOrder,
  get_orders_client,
  getOneOrderUser,
  getOrderById,

  updateOrderStatus,
  userCancelOrder
} from "../controllers/Orders/orders";

const router = Router();
router.post("/orders", createOrder);
router.get("/orders", get_orders_client);
router.post("/orders/get_order_user", getOneOrderUser);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrderStatus);
router.post("/orders/:id/cancel/confirm", adminCancelOrder);
router.post("/orders/:id/cancel", userCancelOrder);
export default router;
