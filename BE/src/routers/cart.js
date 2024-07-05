import { Router } from "express";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeProductToCart,
  updateQuantityProductsInCart
} from "../controllers/Cart/cart";

const Routes_Carts = Router();
//Lấy danh sách sản phẩm trong giỏ hàng
Routes_Carts.get("/carts/:userId", getCartByUserId);
//thêm sản phẩm vào giỏ hàng
Routes_Carts.post("/cart/add-to-cart", addItemToCart);
//Cập nhật số lượng sản phẩm bằng cách nhập vào input
Routes_Carts.post(
  "/cart/update-quantity-products-to-cart",
  updateQuantityProductsInCart
);
//Xóa sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/remove-product-to-cart", removeProductToCart);
//Tăng số lượng sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/increase-product-quantity-in-cart", increaseProductQuantity);
//giảm số lượng sản phẩm trong giỏ hàng
Routes_Carts.post("/cart/decrease-product-quantity-in-cart", decreaseProductQuantity);
export default Routes_Carts;
