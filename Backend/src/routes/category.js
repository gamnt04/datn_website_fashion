import { Router } from "express";
// import { checkPermission } from "../middlewares/checkPermission.js";
import { create, get, getById, remove, update } from "../controllers/Category.js";
const routerCategory = Router();

routerCategory.post("/", create);
routerCategory.get("/", get);
routerCategory.get("/:id", getById);
routerCategory.put("/:id", update);
routerCategory.delete("/:id", remove);

export default routerCategory;
