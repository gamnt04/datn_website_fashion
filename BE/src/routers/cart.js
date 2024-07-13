import { Router } from "express";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeMultipleProductsFormCart,
  removeProductToCart,
  updateQuantityProductsInCart
} from "../controllers/Cart/cart";

const Routes_Carts = Router();
//Lấy danh sách sản phẩm trong giỏ hàng
Routes_Carts.get("/cart/:userId", getCartByUserId);
//thêm sản phẩm vào giỏ hàng
Routes_Carts.post("/cart", addItemToCart);
//Cập nhật số lượng sản phẩm bằng cách nhập vào input
Routes_Carts.post(
  "/cart/update-quantity-products-to-cart",
  updateQuantityProductsInCart
);
//Xóa nhiều sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/remove-multiple", removeMultipleProductsFormCart);
//Xóa sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/remove", removeProductToCart);
//Tăng số lượng sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/up", increaseProductQuantity);
//giảm số lượng sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/dow", decreaseProductQuantity);
export default Routes_Carts;
