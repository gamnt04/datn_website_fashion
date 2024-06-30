import { Router } from "express";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeProductToCart,
  updateQuantityProductsInCart
} from "../controllers/cart";

const router = Router();
//Lấy danh sách sản phẩm trong giỏ hàng
router.get("/carts/:userId", getCartByUserId);
//thêm sản phẩm vào giỏ hàng
router.post("/cart/add-to-cart", addItemToCart);
//Cập nhật số lượng sản phẩm bằng cách nhập vào input
router.post(
  "/cart/update-quantity-products-to-cart",
  updateQuantityProductsInCart
);
//Xóa sản phẩm trong giỏ hàng
router.post("/cart/remove-product-to-cart", removeProductToCart);
//Tăng số lượng sản phẩm trong giỏ hàng
router.post("/cart/increase-product-quantity-in-cart", increaseProductQuantity);
//giảm số lượng sản phẩm trong giỏ hàng
router.post("/cart/decrease-product-quantity-in-cart", decreaseProductQuantity);
export default router;
