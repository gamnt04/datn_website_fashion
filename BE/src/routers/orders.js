import { Router } from "express";
import {
  adminCancelOrder,
  createOrder,
  createOrderPayment,
  get_orders_client,
  getOneOrderUser,
  getOrderById,

  updateOrderStatus,
  userCancelOrder
} from "../controllers/Orders/orders";

const router = Router();
router.post("/orders", createOrder);
router.get("/orders", get_orders_client);
router.get("/orders/get_order_user/:userId", getOneOrderUser);
router.get("/orders/:id", getOrderById);
router.patch("/orders/:id", updateOrderStatus);
router.post("/orders/:id/cancel/confirm", adminCancelOrder);
router.post("/orders/:id/cancel", userCancelOrder);
router.post("/orderspayment", createOrderPayment)
export default router;
