import React from "react";

const Blogs = () => {
  return (
    <div>
      <div className=" w-full bg-[#F5F5F5]">
        <nav className="container mx-auto  px-[30px]  max-w-[1200px]">
          <ul className="flex">
            <li>
              <a href="" className="px-[10px] text-sm text-[#A3A3A3]">
                Home
              </a>
            </li>
            <span>/</span>
            <li>
              <a href="" className="px-[10px] text-sm">
                News
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto max-w-[1200px] py-[20px]">
        <h2 className="text-[25px] ">News</h2>
      </div>
      <div className="grid grid-cols-3 mx-auto max-w-[1400px] ">
        <div className="">
          <div className="px-[20px]">
            <div className="">
              <img
                src="https://picsum.photos/500/500"
                alt=""
                className="w-[400px] h-[350px] "
              />
            </div>
            <div className="">
              <a href="">View full details</a>
            </div>
            <div className="">
              <h3>
                <a href="">Urna pretium elit mauris cursus</a>
              </h3>
            </div>
          </div>
        </div>
        <div className="">
          <div className="">Bài viết 2</div>
        </div>
        <div className="">
          <div className="">Bài viết 3</div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
