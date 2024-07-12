import express from "express";
import {
GetAllBlogs, getBlogsById
} from "../controllers/Blog/blog.js";
const Routes_blog = express.Router();
Routes_blog.get("/blog/:blogId", getBlogsById);
Routes_blog.get("/blogs", GetAllBlogs);
export default Routes_blog;
