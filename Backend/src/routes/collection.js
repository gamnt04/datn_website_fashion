import { Router } from "express";
// import { checkPermission } from "../middlewares/checkPermission.js";
import { create, get, getById, remove, update } from "../controllers/Collection.js";
const routerCollection = Router();

routerCollection.post("/", create);
routerCollection.get("/", get);
routerCollection.get("/:id", getById);
routerCollection.put("/:id", update);
routerCollection.delete("/:id", remove);

export default routerCollection;
