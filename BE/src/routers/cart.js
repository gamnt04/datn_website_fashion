import { Router } from "express";
import { addProductsToCart, getCartByIdUser } from "../controllers/cart";

const router = Router();

router.post("/cart/add-to-cart", addProductsToCart);
router.get("/cart/:userId", getCartByIdUser);

export default router;
