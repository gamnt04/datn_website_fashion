import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";

const Ourblog = () => {
  const { data } = useQuery({
    queryKey: ['BLOGS'],
    queryFn: async () => {
      const { data } = await instance.get('/blogs');
      return data;
    }
  });

  const filterPublishedBlogs = (blogs: any) => {
    return blogs.filter((blog: any) => blog.published);
  };

  // Lọc bài viết đã xuất bản
  const publishedBlogs = filterPublishedBlogs(data || []);

  // Chọn 3 bài viết nổi bật
  const featuredBlogs = publishedBlogs.slice(0, 3);

  return (
    <div className="xl:w-[1440px] w-[95vw] mx-auto">
      <div className="lg:mt-[40px] mt-[60px]">
        <div className="text-sm py-6 bg-[#F3F3F3] font-medium px-[2.5%] rounded">
          Home &#10148; Products &#10148; Blog
        </div>
        <div className="container mx-auto pt-[20px] text-center">
          <h1 className="text-[30px] font-bold">Tin tức nổi bật</h1>
        </div>
        <div className="container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pt-[20px]">
          {featuredBlogs.map((blog: any) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(blog.content, "text/html");
            const title = doc.querySelector("h1");
            const image = doc.querySelector("img");
            const content = doc.querySelector("p");

            return (
              <div key={blog._id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <div className="wrapper-image max-w-full max-h-[250px] overflow-hidden object-cover">
                  <img
                    src={image?.src}
                    alt={title?.textContent || "Blog image"}
                    className="image_blog w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="view_blog bg-[#1C1C1C] py-[15px] text-center">
                  <a
                    href={`/blogs/${blog._id}`}
                    className="text-white text-[20px] font-semibold"
                  >
                    View full details
                  </a>
                </div>
                <div className="px-4 py-4">
                  <h2 className="py-[10px] text-[20px] font-semibold">
                    <a href={`/blogs/${blog._id}`} className="text-gray-900 hover:text-blue-600 transition-colors duration-300">
                      {title?.textContent}
                    </a>
                  </h2>
                  <div className="flex text-[#7D7D7D] text-[14px] space-x-4 mb-2">
                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                    <p>{blog.author}</p>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {String(content?.innerHTML).substring(0, 100)}...
                  </p>
                  <div className="text-center mt-4">
                    <a
                      href={`/blogs/${blog._id}`}
                      className="text-blue-500 hover:text-blue-700 font-semibold"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Ourblog;
