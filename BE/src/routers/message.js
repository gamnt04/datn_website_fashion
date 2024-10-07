import { Router } from "express";
import {
  getMessagesByUserId,
  sendMessage
} from "../controllers/Message/message";

const Router_Message = Router();
Router_Message.post("/message/send", sendMessage);
Router_Message.get("/message/:userId", getMessagesByUserId);

export default Router_Message;
