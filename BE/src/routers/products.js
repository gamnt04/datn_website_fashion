import { Router } from "express";
import {
  createProduct,
  deleteProductById,
  getAll,
  getProductById,
  updateProductById,
} from "../controllers/Products";

const router = Router();
router.get("/products", getAll);
router.get("/products/:id", getProductById);
router.delete("/products/:id", deleteProductById);
router.put("/products/:id", updateProductById);
router.post("/products", createProduct);

export default router;
