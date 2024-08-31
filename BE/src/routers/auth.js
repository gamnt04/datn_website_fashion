import express from "express";
import {
  GetAllUser,
  GetAuthById,
  add_address,
  delete_address,
  get_address,
  signin,
  signup,
  updateUserAddress,
  updateUser,
  logout,
  Get_All_User_Search,
  getAddressById,
  setDefaultAddress,
  GetUsersByEmailOrName
} from "../controllers/Auth/auth";
import { forgotPassword } from "../controllers/Auth/ForgotPass";
const Routes_auth = express.Router();
Routes_auth.post("/auth/signup", signup);
Routes_auth.post("/auth/signin", signin);
Routes_auth.post("/auth/logout", logout);
Routes_auth.get("/auth/:userId", GetAuthById);
Routes_auth.put("/auth/:userId", updateUser);
Routes_auth.post("/auth/search", GetUsersByEmailOrName);
Routes_auth.get("/auths/search", Get_All_User_Search);

// Routes_auth.put("/auth/${userId}/avatar", updateUserAvatar);
Routes_auth.get("/auths", GetAllUser);
Routes_auth.get("/auths/search", Get_All_User_Search);
Routes_auth.post("/auth/add_address", add_address);
Routes_auth.get("/auth/address/:userId", get_address);
Routes_auth.get("/auth/address/:userId/:addressId", getAddressById);
Routes_auth.put("/auth/:userId/:addressId", updateUserAddress);
Routes_auth.delete("/auth/:userId/:addressId", delete_address);
Routes_auth.patch("/auth/:userId/:addressId/default", setDefaultAddress);
Routes_auth.post("/forgot-password", forgotPassword);
export default Routes_auth;
