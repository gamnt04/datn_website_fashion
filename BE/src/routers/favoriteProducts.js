import express from "express";
import {
  GetFavoriteProductByUserId,
  addFavoriteProducts,
  removeFavoriteProduct
} from "../controllers/favoriteProducts";

const router = express.Router();
//Lấy danh sách sản phẩm trong phần yêu thích
router.get("/favorite/products/:userId", GetFavoriteProductByUserId);
//thêm sản phầm vào danh mục yêu thích
router.post("/favorite/products", addFavoriteProducts);
router.post("/favorite/remove-product", removeFavoriteProduct);

export default router;
