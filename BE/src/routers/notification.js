import { Router } from "express";
import { createNotification, getAllNotification, getNotificationByUser, update_notification } from "../controllers/Notification/notification";

const router = Router();
router.post("/notification", createNotification);
router.get("/notification/:userId", getNotificationByUser);
router.get("/notification/", getAllNotification);
router.put("/notification/:id", update_notification);
export default router