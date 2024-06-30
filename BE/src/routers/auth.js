import express from "express";
import {
  add_address,
  delete_address,
  get_address,
  signin,
  signup,
  update_address,
} from "../controllers/auth";
const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.post("/auth/add_address", add_address);
router.get("/auth/:userId", get_address);
router.put("/auth/:userId/:addressId", update_address); // Cập nhật địa chỉ của người dùng
router.delete("/auth/:userId/:addressId", delete_address); // Xóa địa chỉ của người dùng

export default router;
