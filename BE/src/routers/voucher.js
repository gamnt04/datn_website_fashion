import express from "express";
import { addVoucher } from "../controllers/Voucher/voucher";

const Routes_voucher = express.Router();

Routes_voucher.post("/voucher", addVoucher);

export default Routes_voucher;
