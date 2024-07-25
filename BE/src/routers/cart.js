import { Router } from "express";
import {
  getCartByUserId,
  handle_status_checked,
  removeMultipleProductsFormCart,
  removeProductToCart,
} from "../controllers/Cart/cart";
import { addItemToCart, decreaseProductQuantity, increaseProductQuantity, updateQuantityProductsInCart } from "../controllers/Cart/Options";

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
Routes_Carts.post("/cart/handle_status_cart", handle_status_checked);
export default Routes_Carts;
