import moment from "moment";
import crypto from "crypto";
import qs from "qs";
import axios from "axios";
import express from "express";
import { URL } from "url"; // Module URL có sẵn trong Node.js

const app = express();
const tmnCode = "N4OAU1DW";
const secretKey = "F4FX3YXLUF6X6KFACETVIFBRB46YS8IK";
let vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
const returnUrl = "http://localhost:5173/profile/allorder";

// Hàm sắp xếp object
function sortObject(obj) {
  let sorted = {};
  let keys = Object.keys(obj);
  keys.sort();
  keys.forEach((key) => {
    sorted[key] = encodeURIComponent(obj[key]).replace(/%20/g, "+");
  });
  return sorted;
}

// Hàm tạo URL thanh toán
export function createPaymentUrl(req, res, next) {
  const { orderId, totalPrice, orderDescription, language, bankCode } = req.body;

  // Nếu orderId không có, tạo mới một orderId
  if (!orderId || isNaN(totalPrice) || totalPrice <= 0) {
    return res.status(400).json({ error: "Dữ liệu không hợp lệ" });
  }

  const ipAddr =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);

  const date = new Date();
  const createDate = moment(date).format("YYYYMMDDHHmmss");

  const currCode = "VND";
  const vnp_Params = {
    vnp_Version: "2.1.0",
    vnp_Command: "pay",
    vnp_TmnCode: tmnCode,
    vnp_Locale: language || "vn",
    vnp_CurrCode: currCode,
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderDescription + orderId,
    vnp_OrderType: "other",
    vnp_Amount: totalPrice * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  };

  if (bankCode) {
    vnp_Params["vnp_BankCode"] = bankCode;
  }

  const sortedVnpParams = sortObject(vnp_Params);

  const signData = qs.stringify(sortedVnpParams, { encode: false });
  const hmac = crypto.createHmac("sha512", secretKey);
  const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
  sortedVnpParams["vnp_SecureHash"] = signed;
  const paymentUrl = vnpUrl + "?" + qs.stringify(sortedVnpParams, { encode: false });

  res.json({ paymentUrl: paymentUrl });
}

// Hàm xử lý trả về từ VNPay
 export function returnUrll (req, res, next) {
  var vnp_Params = req.query;

  var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  var config = require('config');
  var tmnCode = config.get('vnp_TmnCode');
  var secretKey = config.get('vnp_HashSecret');

  var querystring = require('qs');
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");     
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

  if(secureHash === signed){
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

      res.render('success', {code: vnp_Params['vnp_ResponseCode']})
  } else{
      res.render('success', {code: '97'})
  }
};
