import express from "express";
import {
  GetFavoriteProductByUserId,
  addFavoriteProducts,
  removeFavoriteProduct
} from "../controllers/Favorites_Items/favoriteProducts";

const Routes_Favorites = express.Router();
//Lấy danh sách sản phẩm trong phần yêu thích
Routes_Favorites.get("/favorite/products/:userId", GetFavoriteProductByUserId);
//thêm sản phầm vào danh mục yêu thích
Routes_Favorites.post("/favorite/add-products", addFavoriteProducts);
Routes_Favorites.post("/favorite/remove-product", removeFavoriteProduct);

export default Routes_Favorites;
