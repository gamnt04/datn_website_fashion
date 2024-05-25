import { Router } from "express";
// import { checkPermission } from "../middlewares/checkPermission.js";
import {
  Statistical,
  create,
  get,
  getById,
  remove,
  update
} from "../controllers/Category.js";
const routerCategory = Router();

routerCategory.post("/", create);
routerCategory.get("/", get);
routerCategory.get("/:id", getById);
routerCategory.put("/:id", update);
routerCategory.delete("/:id", remove);
routerCategory.get("/categorys/statistical", Statistical);

export default routerCategory;
