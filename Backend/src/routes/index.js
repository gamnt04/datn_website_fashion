import { Router } from "express";
import routerCategory from "./category.js";
const router = Router();
router.use("/category", routerCategory);

export default router;
