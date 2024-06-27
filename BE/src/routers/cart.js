import { Router } from "express";
import {
  addProductsToCart,
  getCartByIdUser,
  removeProductToCart,
  updateQuantityProductsInCart
} from "../controllers/cart";

const router = Router();

router.post("/cart/add-to-cart", addProductsToCart);
router.post(
  "/cart/update-quantity-products-to-cart",
  updateQuantityProductsInCart
);
router.get("/cart/:userId", getCartByIdUser);
router.delete("/cart/remove-product-to-cart", removeProductToCart);

export default router;
