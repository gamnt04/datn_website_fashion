import { useEffect, useState } from "react";
import { Blog } from "../../../common/interfaces/Blog";
import instance from "../../../configs/axios";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
    const [showForm, setShowForm] = useState(false); // State để điều khiển hiển thị form
      const [newBlog, setNewBlog] = useState<Partial<Blog>>({
    title: "",
    content: "",
    author: "",
    tags: [],
    published: false,
  });



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await instance.get("/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

 const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete this blog?");
      if (confirm) {
        const response = await instance.delete(`/blog/${id}`);
        if (response.status === 200) {
          alert("Blog deleted successfully!");
          window.location.reload()
        } else {
          throw new Error("Failed to delete blog");
        }
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog. Please try again later.");
    }
  };

    const toggleForm = () => {
    setShowForm(!showForm); // Toggle giá trị của showForm
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post("/blogs/add_blog", newBlog);
      if (response.status === 201) {
        alert("Blog created successfully!");
        setShowForm(false); // Ẩn form sau khi đăng bài thành công
        setNewBlog({ title: "", content: "", author: "", tags: [], published: false }); // Reset form
        // fetchBlogs(); // Lấy lại danh sách blogs mới sau khi thêm mới
         window.location.reload()
      } else {
        throw new Error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog. Please try again later.");
    }
  };


  return (
    <div className="container mx-auto mt-8">
   <button onClick={toggleForm} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4">
        {showForm ? "Hide Form" : "Add Blog"} {/* Hiển thị nút "Hide Form" khi showForm true */}
      </button>
      {showForm ? ( // Hiển thị form khi showForm true
         <div className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Enter title"
                name="title"
                value={newBlog.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                Content
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="content"
                placeholder="Enter content"
                name="content"
                value={newBlog.content}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="author"
                type="text"
                placeholder="Enter author"
                name="author"
                value={newBlog.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                Tags
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="tags"
                type="text"
                placeholder="Enter tags (comma separated)"
                name="tags"
                value={newBlog.tags?.join(", ") || ""}
                onChange={(e) => setNewBlog((prev) => ({ ...prev, tags: e.target.value.split(", ") }))}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="published">
                Published
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="published"
                name="published"
                value={newBlog.published ? "true" : "false"}
                onChange={(e) => setNewBlog((prev) => ({ ...prev, published: e.target.value === "true" }))}
                required
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create Blog
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={toggleForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : ( 
        <div>
           <h2 className="text-2xl font-bold mb-4">Blog List</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Times</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Published</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className=" font-bold uppercase px-6 py-4 whitespace-nowrap">{blog.title}</td>
                 <td className="px-6 py-4 whitespace-nowrap">{blog.createdAt}</td>
                <td className="px-6 py-4 whitespace-nowrap">{blog.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">{blog.published ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button>Edit</button>
                  <button onClick={() => handleDelete(blog._id!)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </div>
     )}

    </div>
  );
};

export default BlogList;