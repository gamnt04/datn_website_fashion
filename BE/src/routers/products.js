import { Router } from "express";
import { get_items_client, getProductById } from "../controllers/Items/Get";
import { deleteProductById } from "../controllers/Items/Remove";
import { updateProductById } from "../controllers/Items/Edit";
import { createProduct } from "../controllers/Items/Create";
import { restore_item } from "../controllers/Items/Recycle";


const Routes_Products = Router();
Routes_Products.get("/products", get_items_client);
Routes_Products.get("/products/:id", getProductById);
Routes_Products.delete("/products/:id", deleteProductById);
Routes_Products.put("/products/:id", updateProductById);
Routes_Products.patch("/products/:id", restore_item);
Routes_Products.post("/products", createProduct);

export default Routes_Products;
