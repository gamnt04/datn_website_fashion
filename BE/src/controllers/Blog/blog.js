import { StatusCodes } from "http-status-codes";
import Blog from "../../models/Blog/blog";

export const GetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    if (blogs.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Blogs not found" });
    }
    return res.status(StatusCodes.OK).json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error fetching blogs" });
  }
};

export const getBlogsById = async (req, res) => {
  try {
    const id = req.params.blogId;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Blog not found" });
    }
    return res.status(StatusCodes.OK).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "MongoDB Query Error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields: title, content, and author" });
    }

    const newBlog = new Blog({content });
    const savedBlog = await newBlog.save();
    res.status(StatusCodes.CREATED).json({ message: "Thêm blog thành công", savedBlog });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Lỗi khi tạo blog mới" });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const id = req.params.blogId;
    const { title, content, author, tags, published, imageUrl } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author, tags, published },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy blog để cập nhật" });
    }
    res.status(StatusCodes.OK).json({ message: "Update blog thành công", updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Lỗi khi cập nhật blog" });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const id = req.params.blogId;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy blog để xóa" });
    }
    res.status(StatusCodes.OK).json({ message: "Xóa blog thành công" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Lỗi khi xóa blog" });
  }
};