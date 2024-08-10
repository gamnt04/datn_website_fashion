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
    const { content,author } = req.body;
    if (!content) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: "Missing required fields: title, content, and author" });
    }

    const newBlog = new Blog({content, author });
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
    const { content, author, published } = req.body;

    // Tạo đối tượng cập nhật với các thuộc tính chỉ nếu chúng tồn tại
    const updateData = {};
    if (content !== undefined) updateData.content = content;
    if (author !== undefined) updateData.author = author;
    if (published !== undefined) updateData.published = published;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Không tìm thấy blog để cập nhật" });
    }

    res.status(StatusCodes.OK).json({ message: "Cập nhật blog thành công", updatedBlog });
  } catch (error) {
    console.error("Lỗi khi cập nhật blog:", error); // Ghi lại thông tin lỗi
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
export const relactedBlog = async (req, res) => {
  try {
    // Get the blog ID to exclude from query parameters
    const { excludeId } = req.query;

    // Fetch all blogs except the one with the given ID
    const blogs = await Blog.find({ _id: { $ne: excludeId } });

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching related blogs:', error);
    res.status(500).json({ error: 'Error fetching related blogs' });
  }
}