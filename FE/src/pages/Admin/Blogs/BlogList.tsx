import { useEffect, useState } from "react";
import { Blog } from "../../../common/interfaces/Blog";
import instance from "../../../configs/axios";

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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

  return (
    <div className="container mx-auto mt-8">
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
  );
};

export default BlogList;