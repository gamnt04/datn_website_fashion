import { Router } from "express";
import { createNotification, getNotification } from "../controllers/Notification/notification";

const router = Router();
router.post("/notification", createNotification);
router.get("/notification", getNotification);
export default router