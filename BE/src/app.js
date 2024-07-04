import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/connect';
import Routes_Products from './routers/products';
import Routes_categories from './routers/category';
import Routes_orders from './routers/orders';
import Routes_auth from './routers/auth';
import Routes_Favorites from './routers/favoriteProducts';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDB(process.env.DB_URI);

app.use('/api/v1', Routes_Products)


app.use("/api/v1", Routes_categories);
app.use("/api/v1", Routes_orders);
app.use("/api/v1", Routes_auth);
app.use("/api/v1", Routes_auth);
app.use("/api/v1", Routes_Favorites);


export const viteNodeApp = app;