import { Router } from "express";
import {
  create,
  deleteById,
  getAll,
  getById,
  updateById
} from "../controllers/product";
const route = Router();
route.get(`/products`, getAll);
route.get(`/products/:id`, getById);
route.post(`/products`, create);
route.delete(`/products/:id`, deleteById);
route.put(`/products/:id`, updateById);
export default route;
