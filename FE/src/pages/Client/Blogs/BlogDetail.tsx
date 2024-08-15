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
  const [toc, setToc] = useState<any[]>([]); // State for table of contents

  console.log('Blog:', slug);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:2004/api/v1/blogs/detail/${slug}`);
        const parser = new DOMParser();
        const doc = parser.parseFromString(response.data.content, "text/html");

        setTitle(doc.querySelector("h1")?.innerText ?? 'Không có tiêu đề');
        const h1Tag = doc.querySelector("h1");
        if (h1Tag) {
          h1Tag.remove();
        }
        setBlog({ content: doc.body.innerHTML , createdAt: response.data.createdAt, author: response.data.author });

        // Generate TOC
        const tocItems = Array.from(doc.querySelectorAll('h1, h2, h3')).map((heading: any) => ({
          id: heading.id || slugify(heading.innerText),
          text: heading.innerText,
          level: heading.tagName.toLowerCase(),
        }));
        setToc(tocItems);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    const fetchRelatedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:2004/api/v1/relacted');
        const filteredBlogs = response.data.filter((b: any) => b.slug !== slug);
        setRelatedBlogs(filteredBlogs);
      } catch (error) {
        console.error('Error fetching related blogs:', error);
      }
    };

    fetchBlog();
    fetchRelatedBlogs();
  }, [slug]);

  useEffect(() => {
    console.log('Updated Related Blogs State:', relatedBlogs);
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
  <div className="w-1/3 flex flex-col gap-8">
    {/* Table of Contents */}
    <aside className="bg-[#f0f0f0] text-gray-900 p-4 rounded-md border border-gray-300 shadow-md h-fit sticky top-16">
      <h2 className="text-xl font-semibold mb-4">Mục lục</h2>
      <ul>
        {toc.length > 0 ? (
          toc.map((item) => (
            <li key={item.id} className={`ml-${item.level === 'h2' ? 4 : item.level === 'h3' ? 8 : 0}`}>
              <a href={`#${item.id}`} className="text-gray-700 font-medium hover:text-black hover:underline transition-colors duration-200">
                {item.text}
              </a>
            </li>
          ))
        ) : (
          <li>Không có mục lục</li>
        )}
      </ul>
    </aside>

    {/* Related Blogs */}
    <aside className="bg-gray-100 p-4 rounded-lg shadow-md h-fit sticky top-16">
      <h2 className="text-xl font-semibold mb-4">Bài viết liên quan</h2>
      <ul>
        {relatedBlogs.length > 0 ? (
          relatedBlogs.map((relatedBlog) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(relatedBlog.content, "text/html");
            const titleElement = doc.querySelector("h1");
            const imageElement = doc.querySelector("img");

            const title = titleElement ? titleElement.textContent : "Không có tiêu đề";
            const image = imageElement ? imageElement.src : "";

            return (
              <li key={relatedBlog.slug} className="mb-2 flex items-center">
                {image && (
                  <img src={image} alt={title ?? ""} className="w-16 h-16 object-cover mr-4 rounded" />
                )}
                <Link to={`/blogs/${relatedBlog.slug}`} className="text-blue-500 hover:text-blue-700">
                  {title}
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
</div>
  );
};

export default BlogDetail;