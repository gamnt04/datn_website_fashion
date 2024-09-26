import express from "express";
import {
  addVoucher,
  getVoucher,
  getVoucherById,
} from "../controllers/Voucher/voucher";

const Routes_voucher = express.Router();

Routes_voucher.get("/voucher", getVoucher);
Routes_voucher.get("/voucher/:id", getVoucherById);

Routes_voucher.post("/voucher", addVoucher);

export default Routes_voucher;
