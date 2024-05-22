import { Router } from "express";
import routerCategory from "./category.js";
import routerCollection from "./collection.js";
const router = Router();
router.use("/category", routerCategory);
router.use("/collection", routerCollection);

export default router;
