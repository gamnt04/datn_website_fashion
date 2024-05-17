import React from "react";
import "./style.css";
const DetailBlogs = () => {
  return (
    <div>
      <div className=" w-full bg-[#F5F5F5]">
        <nav className="container mx-auto py-[40px]  max-w-[1200px]">
          <ul className="flex">
            <li>
              <a href="" className=" text-[16px] text-[#A3A3A3]">
                Home
              </a>
            </li>
            <span className="px-[10px]">/</span>
            <li>
              <a href="" className=" text-[16px]">
                News
              </a>
            </li>
            <span className="px-[10px]">/</span>
            <li>
              <a href="" className=" text-[16px]">
                Make a list of all of the patio furniture you'll need
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="pt-[50px] mx-auto max-w-[1200px] grid grid-cols-3 gap-6 ">
        <div className="col-span-2">
          <div className="pt-[20px]">
            <img
              src="https://picsum.photos/1000/1000"
              alt=""
              className="object-cover max-h-[550px] w-[100%] "
            />
          </div>
          <div className="pt-[40px] pb-[10px]">
            <h1 className="text-[25px] font-medium">
              Make a list of all of the patio furniture you'll need
            </h1>
            <p className="text-[10px] pt-[10px] text-[#6C6C6C]">
              FEBRUARY 2, 2024{" "}
            </p>
          </div>
          <div className="py-[30px]">
            <p className="text-[16px] font-light text-[#6C6C6C]">
              Prepare your outdoor area by imagining how you would want it to
              perform its functions. Do you want it to be used as a dining area
              on hot summer nights? If so, what size table do you want? If so,
              do you intend to use the area to hold your next dinner party or a
              birthday celebration for your child? Alternatively, can you
              picture a tranquil reading nook hidden away in your outdoor room?
              Make a list of the activities you want to perform in the area and
              use that list as a guide to decide what kind of patio furniture
              you'll need. It is not necessary to have a dining table on your
              12x16-foot patio if the space's primary purpose is to entertain
              informal evening drinks. Instead, choose a space with plenty of
              comfy seating, numerous side tables, and a fire pit as your
              centerpiece.
            </p>
          </div>
          <div className="flex space-x-2 pb-[30px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6C6C6C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-facebook"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6C6C6C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-instagram"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6C6C6C"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </div>
          <div className="">
            <a href="" className="flex text-[18px]     justify-center">
              <span className="pr-[5px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-arrow-left pt-[2px]"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
              </span>
              Back to blog
            </a>
          </div>
        </div>
        <div className="pt-[20px] col-span-1">
          <div className="border-t-2 border-b-2 border-dashed  ">
            <div className="py-[20px]">
              <h4 className="text-[20px] font-bold">Something About Us</h4>
            </div>
            <div className="item_blog ">
              <div className="wrapper-image max-w-[380px] max-h-[180px] ">
                <img
                  src="https://picsum.photos/500/500"
                  alt=""
                  className="image_blog object-cover "
                />
              </div>
            </div>
            <div className="py-[20px] max-w-[400px]">
              <p className="italic text-[#414141]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
          <div className="border-b-2 border-dashed  pb-[35px]">
            <div className="pt-[20px] ">
              <h4 className="text-[20px] font-bold">Tags</h4>
            </div>
            <div className="flex flex-wrap ">
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  View all
                </a>
              </div>
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  Bedroom
                </a>
              </div>
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  Chair
                </a>
              </div>
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  Dining
                </a>
              </div>
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  Lighting
                </a>
              </div>
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  Living
                </a>
              </div>
              <div className="pr-[10px] pt-[20px]">
                <a href="" className="px-[20px] py-[10px] rounded-3xl border">
                  Sofa
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <div className="pt-[20px] ">
              <h4 className="text-[20px] font-bold">Recent Post</h4>
            </div>
            <div className="py-[20px] space-y-[20px] border-b-2 border-dashed">
              <div className="flex shadow-lg">
                <div className="max-w-[30%] pr-[20px] ">
                  <img
                    src="https://picsum.photos/500/500"
                    alt=""
                    className="object-cover max-h-[115px] "
                  />
                </div>
                <div className="pt-[15px]">
                  <h4 className="text-[#575757] text-[13px] font-bold">
                    AUGUST 29, 2023
                  </h4>
                  <p className="pt-[10px] text-[#2B2B2B] text-[13px]">
                    Urna pretium elit mauris cu...
                  </p>
                </div>
              </div>
              <div className="flex shadow-lg">
                <div className="max-w-[30%] pr-[20px] ">
                  <img
                    src="https://picsum.photos/500/500"
                    alt=""
                    className="object-cover max-h-[115px] "
                  />
                </div>
                <div className="pt-[15px]">
                  <h4 className="text-[#575757] text-[13px] font-bold">
                    AUGUST 29, 2023
                  </h4>
                  <p className="pt-[10px] text-[#2B2B2B] text-[13px]">
                    Urna pretium elit mauris cu...
                  </p>
                </div>
              </div>
              <div className="flex shadow-lg">
                <div className="max-w-[30%] pr-[20px] ">
                  <img
                    src="https://picsum.photos/500/500"
                    alt=""
                    className="object-cover max-h-[115px] "
                  />
                </div>
                <div className="pt-[15px]">
                  <h4 className="text-[#575757] text-[13px] font-bold">
                    AUGUST 29, 2023
                  </h4>
                  <p className="pt-[10px] text-[#2B2B2B] text-[13px]">
                    Urna pretium elit mauris cu...
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="pt-[20px] ">
              <h4 className="text-[20px] font-bold">Featured Collection</h4>
            </div>
            <div className=" pt-[20px]">
              <div className="item_blog border  ">
                <div className="relative wrapper-image max-w-[400px] max-h-[675px]  ">
                  <img
                    src="https://picsum.photos/500/675"
                    alt=""
                    className="image_blog object-cover "
                  />

                  <div className="absolute bottom-3 left-0 right-0 bg-white bg-opacity-80 text-[#2B2B2B] p-4 max-w-[360px] mx-auto">
                    <p className="text-sm">New Arrival</p>
                    <h3 className="text-2xl font-bold">Sale Off 30%</h3>
                    <a href="" className="text-base mt-2 underline pb-[10px]">
                      Discover Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-[36px] my-[50px] bg-[#F6F6F6]  w-full ">
        <form action="" className="px-[30px] mx-auto max-w-[726px]">
          <h2 className="text-[20px] font-semibold ">Leave a comment</h2>
          <div className="flex space-x-5 py-[20px]">
            <input
              type="text"
              name=""
              id=""
              className=" w-[341px] h-[41px] border-1 border-[#404040] text-[#404040] shadow-lg pl-[10px]"
              placeholder="Name..."
            />

            <input
              type="text"
              name=""
              id=""
              className="input w-[341px] h-[41px] border-1 border-[#404040] text-[#404040] shadow-lg pl-[10px]"
              placeholder="Email..."
            />
          </div>
          <div className="">
            <textarea
              name=""
              id=""
              placeholder="Comment..."
              className="input w-[665px] h-[102px] border-1 border-[#404040] text-[#404040] shadow-lg p-[10px]"
            ></textarea>
          </div>
          <div className="py-[20px]">
            <p className="text-[#404040] text-[12px]">
              Please note, comments need to be approved before they are
              published.
            </p>
          </div>
          <button className="btn_post px-[30px] py-[10px] bg-[#1C1C1C] text-white">
            Post comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailBlogs;
