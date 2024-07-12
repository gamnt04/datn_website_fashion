import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../../models/Auth/users";
import { signupSchema } from "../../validations/auth";
import Blog from "../../models/Blog/blog";

export const GetAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find();
        if (blogs.length === 0) {
            return res.status(404).json({message: "Blogs not found"})
        }
        return res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
    }
}

export const getBlogsById = async (req,res) => {
try {
    const id = req.params.blogId;
    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(StatusCodes.NOT_FOUND).json({message: "Blog not found"});

    }
    if (blog._id.toString() !== id) {
        return res.status(StatusCodes.NOT_FOUND).json({message: "Blog not found"});

    }
    return res.status(StatusCodes.OK).json(blog)
} catch (error) {
    console.log(error);
        return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "MongoDB Query Error" });
  }
}
