import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<{ content: string; imageUrl: string; author: string; title: string; createdAt: string } | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:2004/api/v1/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <h2 className="text-center text-gray-700 text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  const contentParts = blog.content.split(/(?<=\.)\s+/); //Chia nội dung thành các phần nhỏ

  return (
    <div className="container mx-auto py-10 px-4 lg:px-20">
      <h1 className="text-4xl font-bold mb-4 text-center">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        {new Date(blog.createdAt).toLocaleDateString()} - {blog.author}
      </p>
      
      <div className="prose max-w-none mx-auto text-justify">
        {contentParts.map((part, index) => (
          <div key={index}>
            <p className="mb-4">{part}</p>
            {index % 6 === 1 && (
              <div className="flex justify-center mb-6">
                <img 
                  src={blog.imageUrl} 
                  alt={blog.title} 
                  className="w-full max-w-md h-auto rounded-lg shadow-lg object-contain" 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;
