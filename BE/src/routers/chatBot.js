import e, { Router } from 'express';
import { chatBot } from '../controllers/ChatBot/chatBot';

const Router_ChatBot = Router();

Router_ChatBot.post('/chat_Bot', chatBot)
export default Router_ChatBot;