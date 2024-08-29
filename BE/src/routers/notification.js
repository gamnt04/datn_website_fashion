import { Router } from "express";
import { createNotification, getNotificationByUser } from "../controllers/Notification/notification";

const router = Router();
router.post("/notification", createNotification);
router.get("/notification/:userId", getNotificationByUser);
export default router