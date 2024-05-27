import { Router } from "express";
// import { checkPermission } from "../middlewares/checkPermission.js";

const router = Router();
router.get("/", get);

export default router;
