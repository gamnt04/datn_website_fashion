import express from "express";
import {
  GetAllUser,
  GetAuthById,
  add_address,
  delete_address,
  get_address,
  signin,
  signup,
  updateUserAddress
} from "../controllers/Auth/auth";
const Routes_auth = express.Router();

Routes_auth.post("/auth/signup", signup);
Routes_auth.post("/auth/signin", signin);
Routes_auth.get("/auth/:userId", GetAuthById);
Routes_auth.get("/auths", GetAllUser);
Routes_auth.post("/auth/add_address", add_address);
Routes_auth.get("/auth/:userId", get_address);
Routes_auth.put("/auth/:userId/:addressId", updateUserAddress); // Cập nhật địa chỉ của người dùng
Routes_auth.delete("/auth/:userId/:addressId", delete_address); // Xóa địa chỉ của người dùng

export default Routes_auth;
