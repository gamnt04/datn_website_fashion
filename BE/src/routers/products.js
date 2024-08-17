import { Router } from "express";
import {
  filterItems,
  get_item_dashboard,
  get_items_client,
  getAllProducts,
  getProductById,
} from "../controllers/Items/Get";
import {
  deleteProductById,
  destroy_delete,
  removeMultipleProducts,
} from "../controllers/Items/Remove";
import { updateProductById } from "../controllers/Items/Edit";
import { createProduct } from "../controllers/Items/Create";
import { getTrash, restore_item } from "../controllers/Items/Recycle";

const Routes_Products = Router();
Routes_Products.get("/products_all", getAllProducts);
Routes_Products.get("/products", get_items_client);
Routes_Products.get("/products/dashboard", get_item_dashboard);
Routes_Products.get("/products/:id", getProductById);
//Filter
Routes_Products.get("/products/filter/product", filterItems);
Routes_Products.post("/products", createProduct);
Routes_Products.put("/products/:id", updateProductById);
Routes_Products.post("/products/remove", removeMultipleProducts);
Routes_Products.delete("/products/:id", deleteProductById);
Routes_Products.delete("/products/destroy/:id", destroy_delete);
Routes_Products.patch("/products/recycle/:id", restore_item);
Routes_Products.get("/products/dashboard/trash", getTrash);

export default Routes_Products;
