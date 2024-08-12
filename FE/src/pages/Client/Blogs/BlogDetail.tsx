import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import slugify from 'react-slugify';

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [title, setTitle] = useState('');
console.log('Blog:', slug);
  useEffect(() => {
    const fetchBlog = async () => {
      try {

        const response = await axios.get(`http://localhost:2004/api/v1/blogs/detail/${slug}`);
        // setBlog(response.data);
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.content, "text/html");
        // console.log(doc.querySelector("h1")?.innerHTML);
        
        setTitle(doc.querySelector("h1")?.innerText ?? 'Không có tiêu đề');
        const h1Tag = doc.querySelector("h1");
        if (h1Tag) {
          h1Tag.remove();
        }
        setBlog({ content: doc.body.innerHTML , createdAt: response.data.createdAt, author: response.data.author});
        // console.log(doc.querySelector("h1"));
        // console.log('Fetched Blog:', response.data); // Log the fetched blog
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const fetchRelatedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:2004/api/v1/relacted');
        // console.log('Related Blogs Response:', response.data); // Log the entire response
        const filteredBlogs = response.data.filter((b: any) => b._id !== slug);
        // console.log('Filtered Related Blogs:', filteredBlogs); // Log the filtered blogs
        setRelatedBlogs(filteredBlogs); // Exclude the current blog
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    fetchBlog();
    fetchRelatedBlogs();
  }, [slug]);


  useEffect(() => {
    console.log('Updated Related Blogs State:', relatedBlogs); // Log the updated state
  }, [relatedBlogs]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-gray-700 text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-20 flex gap-8">
      {/* Main content */}
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-4 text-black">{title}</h1>
        <p className="text-sm text-gray-600 mb-6">
          {new Date(blog.createdAt).toLocaleDateString()} - {blog.author}
        </p>
        <div className="prose max-w-none mx-auto text-justify">
          {parse(blog.content)}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md h-fit sticky top-16">
  <h2 className="text-xl font-semibold mb-4">Bài viết liên quan</h2>
  <ul>
    {relatedBlogs.length > 0 ? (
      relatedBlogs.map((relatedBlog) => {
        // Phân tích nội dung HTML của bài viết liên quan
        const parser = new DOMParser();
        const doc = parser.parseFromString(relatedBlog.content, "text/html");
        const titleElement = doc.querySelector("h1");
        const imageElement = doc.querySelector("img");

        // Lấy tiêu đề và hình ảnh từ phần tử HTML
        const title = titleElement ? titleElement.textContent : "Không có tiêu đề";
        const image = imageElement ? imageElement.src : ""; // Đảm bảo src có giá trị hợp lệ

        return (
          <li key={relatedBlog._id} className="mb-2 flex items-center">
            {image && (
              <img src={image} alt={title ?? ""} className="w-16 h-16 object-cover mr-4 rounded" />
            )}
            <Link to={`/blogs/${relatedBlog._id}`} className="text-blue-500 hover:text-blue-700">
              {title} {/* Hiển thị tiêu đề của bài viết liên quan */}
            </Link>
          </li>
        );
      })
    ) : (
      <li>Không có bài viết liên quan</li>
    )}
  </ul>
</aside>

    </div>
  );
};

export default BlogDetail;