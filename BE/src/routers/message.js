import { Router } from "express";
import {
  getMessagesBetweenUsers,
  sendMessage
} from "../controllers/Message/message";

const Router_Message = Router();
Router_Message.post("/message/send", sendMessage);
Router_Message.get("/messages/:userId1/:userId2", getMessagesBetweenUsers);

export default Router_Message;
