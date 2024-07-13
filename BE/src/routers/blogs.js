import express from "express";
import {
GetAllBlogs, getBlogsById, createBlog,updateBlogById
} from "../controllers/Blog/blog.js";
const Routes_blog = express.Router();
Routes_blog.get("/blog/:blogId", getBlogsById);
Routes_blog.get("/blogs", GetAllBlogs);
Routes_blog.post("/blogs/add_blog", createBlog);
Routes_blog.put("/blogs/:blogId", updateBlogById);
export default Routes_blog;
