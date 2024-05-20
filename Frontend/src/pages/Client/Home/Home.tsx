import home from "../../../resources/images/imgHome/imgHomeBlog1.jpg";
const Home = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-5 mb-5">
      <div className="flex gap-2 text-[#222222]">
        <div className="border border-gray-300 h-[456px] relative overflow-hidden flex flex-col items-center rounded">
          <a
            href="#"
            className="block overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              className="h-[378px] w-full object-cover transform-gpu"
              src={home}
              alt="Logo"
            />
          </a>
          <a className="mt-5 text-lg font-semibold text-center" href="">
            Accessories
          </a>
        </div>

        <div className="border border-gray-300 h-[456px] relative overflow-hidden flex flex-col items-center rounded">
          <a
            href="#"
            className="block overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              className="h-[378px] w-full object-cover transform-gpu"
              src={home}
              alt="Logo"
            />
          </a>
          <a className="mt-5 text-lg font-semibold text-center" href="">
            Accessories
          </a>
        </div>

        <div className="border border-gray-300 h-[456px] relative overflow-hidden flex flex-col items-center rounded">
          <a
            href="#"
            className="block overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              className="h-[378px] w-full object-cover transform-gpu"
              src={home}
              alt="Logo"
            />
          </a>
          <a className="mt-5 text-lg font-semibold text-center" href="">
            Accessories
          </a>
        </div>
      </div>
      <div className="flex justify-center mt-5 ">
        <button className="bg-[#222222] text-white w-[114px] h-[44px] hover:bg-[#f68e56] underline font-normal">
          View all
        </button>
      </div>

      <hr className="mt-16 mb-16" />

      <div className="">
        <h2 className="text-[42px] font-medium text-[#222222] text-center">
          Trending Products
        </h2>

        <nav>
          <ul className="flex justify-center gap-10 mt-10 font-normal text-[17px] text-[#999999]">
            <li className="hover:text-[#222222] hover:underline">
              <a href="">Living</a>
            </li>
            <li className="hover:text-[#222222] hover:underline">
              <a href="">Furniture</a>
            </li>
            <li className="hover:text-[#222222] hover:underline">
              <a href="">Accessories</a>
            </li>
            <li className="hover:text-[#222222] hover:underline">
              <a href="">Tech</a>
            </li>
          </ul>
        </nav>

        <div className="grid grid-cols-1 gap-10 mt-10 sm:grid-cols-2 md:grid-cols-4">
          <div className="text-center">
            <img src={home} className="w-[291px] h-[310px]" />

            <h3 className="text-[16px] font-normal text-[#222222] mt-5">
              Dome Lamp
            </h3>
            <p className="text-[10px] font-normal text-[#999999] mt-2">
              Butterfly
            </p>
            <p className="text-[16px] font-medium text-[#222222] mt-2">
              2.000.000 VND
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
            </div>
          </div>

          <div className="text-center">
            <img src={home} className="w-[291px] h-[310px]" />

            <h3 className="text-[16px] font-normal text-[#222222] mt-5">
              Dome Lamp
            </h3>
            <p className="text-[10px] font-normal text-[#999999] mt-2">
              Butterfly
            </p>
            <p className="text-[16px] font-medium text-[#222222] mt-2">
              2.000.000 VND
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
            </div>
          </div>

          <div className="text-center">
            <img src={home} className="w-[291px] h-[310px]" />

            <h3 className="text-[16px] font-normal text-[#222222] mt-5">
              Dome Lamp
            </h3>
            <p className="text-[10px] font-normal text-[#999999] mt-2">
              Butterfly
            </p>
            <p className="text-[16px] font-medium text-[#222222] mt-2">
              2.000.000 VND
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
            </div>
          </div>

          <div className="text-center">
            <img src={home} className="w-[291px] h-[310px]" />

            <h3 className="text-[16px] font-normal text-[#222222] mt-5">
              Dome Lamp
            </h3>
            <p className="text-[10px] font-normal text-[#999999] mt-2">
              Butterfly
            </p>
            <p className="text-[16px] font-medium text-[#222222] mt-2">
              2.000.000 VND
            </p>

            <div className="flex justify-center gap-2 mt-4">
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
              <img
                className="w-[30px] h-[30px] rounded-full border-2 border-transparent hover:border-[#F68E56]"
                src={home}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10 ">
          <button className="bg-[#222222] text-white w-[155px] h-[55px] hover:bg-[#f68e56] underline font-normal">
            VIEW ALL
          </button>
        </div>
      </div>

      {/* {" blog"} */}
      <hr className="my-14" />
      <div>
        <h2 className="text-[42px] font-medium text-center text-[#222222]">
          Our Blog
        </h2>
        <p className="font-normal text-center text-[#999999] mt-6">
          Find a bright ideal to suit your taste with our great selection of
          suspension.
        </p>

        <div className="grid grid-cols-1 gap-9 mt-14 sm:grid-cols-2 md:grid-cols-3 ">
          <div className="overflow-hidden hover:shadow-xl">
            <img
              src={home}
              alt=""
              className="w-[382px] h-[215px] transition-transform duration-300 transform hover:scale-105"
            />
            <div className="px-8 ">
              <h3 className="text-2xl font-normal text-[#222222] mt-6">
                Urna pretium elit mauris cursus
              </h3>
              <p className="text-[12.5px] font-normal text-[#999999]  mt-6">
                August 29, 2023
              </p>
              <p className="text-[16px] font-normal text-[#999999] mt-6 ">
                Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet
                Vestibulum faucibus. At Nulla id tincidunt ut sed semper vel
                Lorem...
              </p>
            </div>
          </div>
          <div className="overflow-hidden hover:shadow-xl">
            <img
              src={home}
              alt=""
              className="w-[382px] h-[215px] transition-transform duration-300 transform hover:scale-105"
            />
            <div className="px-8 ">
              <h3 className="text-2xl font-normal text-[#222222] mt-6">
                Urna pretium elit mauris cursus
              </h3>
              <p className="text-[12.5px] font-normal text-[#999999]  mt-6">
                August 29, 2023
              </p>
              <p className="text-[16px] font-normal text-[#999999] mt-6 ">
                Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet
                Vestibulum faucibus. At Nulla id tincidunt ut sed semper vel
                Lorem...
              </p>
            </div>
          </div>
          <div className="overflow-hidden hover:shadow-xl">
            <img
              src={home}
              alt=""
              className="w-[382px] h-[215px] transition-transform duration-300 transform hover:scale-105"
            />
            <div className="px-8 pb-8">
              <h3 className="text-2xl font-normal text-[#222222] mt-6">
                Urna pretium elit mauris cursus
              </h3>
              <p className="text-[12.5px] font-normal text-[#999999]  mt-6">
                August 29, 2023
              </p>
              <p className="text-[16px] font-normal text-[#999999] mt-6 ">
                Mi vitae magnis Fusce laoreet nibh felis porttitor laoreet
                Vestibulum faucibus. At Nulla id tincidunt ut sed semper vel
                Lorem...
              </p>
            </div>
          </div>{" "}
        </div>
      </div>
      <hr className="mt-14" />
      {/* {" brand"}
       */}
      <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-6">
        <img
          className="w-[200px] h-[170px] transition-transform duration-300 transform hover:scale-105"
          src="https://stark-ver2.myshopify.com/cdn/shop/files/brand1.jpg?v=1693474045&width=200"
          alt=""
        />
        <img
          className="w-[200px] h-[170px] transition-transform duration-300 transform hover:scale-105"
          src="https://stark-ver2.myshopify.com/cdn/shop/files/brand2.jpg?v=1693474055&width=200"
          alt=""
        />
        <img
          className="w-[200px] h-[170px] transition-transform duration-300 transform hover:scale-105"
          src="https://stark-ver2.myshopify.com/cdn/shop/files/brand3.jpg?v=1693474061&width=200"
          alt=""
        />
        <img
          className="w-[200px] h-[170px] transition-transform duration-300 transform hover:scale-105"
          src="https://stark-ver2.myshopify.com/cdn/shop/files/brand4.jpg?v=1693474068&width=200"
          alt=""
        />
        <img
          className="w-[200px] h-[170px] transition-transform duration-300 transform hover:scale-105"
          src="https://stark-ver2.myshopify.com/cdn/shop/files/brand5.jpg?v=1693474075&width=200"
          alt=""
        />
        <img
          className="w-[200px] h-[170px] transition-transform duration-300 transform hover:scale-105"
          src="https://stark-ver2.myshopify.com/cdn/shop/files/brand6.jpg?v=1693474083&width=200"
          alt=""
        />
      </div>
      <hr className="mb-14" />

      <div className=" container mx-auto max-w-[1200px]  text-center ">
        <h2 className="text-[48px] font-normal pb-[15px]">Get in touch</h2>
        <p className="text-[18px] text-[#ABABAB] pb-[30px]">
          Subcrible for latest stories and promotions (35% save)
        </p>
        <div className="pb-[30px]">
          <input
            type="text"
            name=""
            id=""
            placeholder="Email"
            className="w-[640px] h-[46px] border-2 pl-[20px] "
          />
          <button className="btn-submit ml-[20px] w-[122px] h-[46px] bg-[#1C1C1C] text-white">
            Subscribe
          </button>
        </div>
        <div className="">
          <ul className="flex justify-center space-x-5">
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="" className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-facebook"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </li>
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="" className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-youtube"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </a>
            </li>
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="" className="flex items-center justify-center icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-instagram"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </li>
            <li className="link_icon px-4 py-4 border-2 border-[#ABABAB] rounded-full flex items-center justify-center">
              <a href="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ABABAB"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-twitter"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <div className="py-[30px]">
          <p className="text-[#ABABAB]">Don’t worry. We won't spam.</p>
        </div>
      </div>
      <hr className="my-10" />
    </div>
  );
};
export default Home;
