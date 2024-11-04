// import { Router } from "express";
// import { createConversation } from "../controllers/ChatCoze/coze";
// // import { createAndSendMessage } from "../controllers/ChatCoze/coze";
// const Router_coze = Router();
// // Router_coze.post("/send-message", createAndSendMessage);
// Router_coze.post("/create-conversationId", createConversation);
// export default Router_coze;
import { Router } from "express";
import {
  SendMessage,
  GetMessagesByIdUser,
  ReceiveMessage
} from "../controllers/ChatCoze/coze";

const Router_coze = Router();

Router_coze.post("/get_messages", GetMessagesByIdUser);
Router_coze.post("/send_messages", SendMessage);
Router_coze.get("/receive_messages", ReceiveMessage);

export default Router_coze;
