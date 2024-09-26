import express from "express";
import { addVoucher, getVoucher } from "../controllers/Voucher/voucher";

const Routes_voucher = express.Router();

Routes_voucher.get("/voucher", getVoucher);
Routes_voucher.post("/voucher", addVoucher);

export default Routes_voucher;
