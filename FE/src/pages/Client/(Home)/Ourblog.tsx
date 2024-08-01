import { useQuery } from "@tanstack/react-query";
import instance from "../../../configs/axios";
import { Link } from "react-router-dom";
import { Blog } from "../../../common/interfaces/Blog";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Ourblog = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => instance.get(`/blogs`),
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    (isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    ) : (
      <div className="py-16 border-b">
        <h2 className="text-[42px] font-medium text-center text-[#222222]">
          Our Blog
        </h2 >
        <p className="font-normal text-center text-[#999999] mt-6">
          Find a bright ideal to suit your taste with our great selection of
          suspension.
        </p>
        <div className="grid grid-cols-1 gap-9 mt-14 sm:grid-cols-2 md:grid-cols-3 *:rounded">
          {data?.data.map((blog: Blog) => (
            <Link to={`/blogs/${blog._id}`}>
              <div className="pb-10 overflow-hidden duration-500 cursor-pointer hover:shadow-xl group">
                <img
                  src={blog.imageUrl}
                  alt=""
                  className="w-full rounded group-hover:scale-105 h-[215px] transition-transform duration-300 transform"
                />
                <div className="px-8 ">
                  <h3 className="text-2xl font-normal text-[#222222] mt-6">
                    {blog.title}
                  </h3>
                  <p className="text-[12.5px] font-normal text-[#999999]  mt-6">
                    {blog.createdAt}
                  </p>
                  <p className="text-[16px] font-normal text-[#999999] mt-6 line-clamp-3">
                    {blog.content}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div >
    ))
  );
};

export default Ourblog;
