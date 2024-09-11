import express from "express";
import {
  createShipper,
  getAllShippers,
  getShipperById,
  updateShipper,
  deleteShipper,
  GetShippersByName,
} from "../controllers/Shipper/shipper";

const Route_Shipper = express.Router(); // Sử dụng Route_Shipper

// Tạo mới shipper
Route_Shipper.post("/shippers", createShipper);

//Tìm kiếm theo tên Shipper
Route_Shipper.post("/shippers/search", GetShippersByName);
// Lấy danh sách tất cả các shipper
Route_Shipper.get("/shippers", getAllShippers);

// Xem chi tiết một shipper
Route_Shipper.get("/shippers/:id", getShipperById);

// Cập nhật thông tin shipper
Route_Shipper.put("/shippers/:id", updateShipper);

// Xóa shipper
Route_Shipper.delete("/shippers/:id", deleteShipper);

export default Route_Shipper;
