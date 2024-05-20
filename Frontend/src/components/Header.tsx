const Header = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <header className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 bg-white h-[100px] flex justify-center items-center w-[1400px] px-[100px]">
        <a href="#" className="h-20 mr-2 w-28 ">
          <img
            src="../../../src/resources/images/Logo/logo_chung.png"
            alt="Logo"
          />
        </a>

        <nav className="flex-grow">
          <ul className="flex justify-center gap-10 text-base font-semibold text-[#222222]">
            <li>
              <a href="/" className="border-[#f68e56] hover:border-b-2">
                HOME
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                SHOP
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                CATEGORIES
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                BLOG
              </a>
            </li>
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                CONTACT
              </a>
            </li>
            <li className="relative">
              <a href="#" className="border-[#f68e56] hover:border-b-2">
                PAGES
              </a>
              <ul className="absolute left-0 hidden w-32 mt-1 bg-white border rounded-sm top-full">
                <li>
                  <a
                    href="/about-us"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="block px-4 py-2 hover:bg-gray-100">
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="/delivery"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Delivery
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <nav className="ml-auto ">
          <ul className="flex items-center float-right gap-10">
            <li>
              <a href="#" className="group">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="transition-colors duration-300 modal__toggle-open icon"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 19.6 19.6"
                  style={{
                    fill: "currentColor",
                    width: "20px",
                    height: "20px",
                  }}
                  xmlSpace="preserve"
                >
                  <path
                    fill="currentColor"
                    className="text-black group-hover:text-[#F68E56]"
                    d="M19.3,18.3l-4.1-4.1c3.1-3.7,2.6-9.1-1.1-12.2S5.1-0.6,2,3.1s-2.6,9.1,1.1,12.2c3.2,2.7,7.9,2.7,11.1,0l4.1,4.1  c0.3,0.3,0.8,0.3,1.1,0S19.6,18.6,19.3,18.3L19.3,18.3z M1.5,8.7c0-3.9,3.2-7.1,7.1-7.1s7.1,3.2,7.1,7.1s-3.2,7.1-7.1,7.1  C4.7,15.8,1.5,12.6,1.5,8.7L1.5,8.7z"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="/cart" className="group">
                <svg
                  className="transition-colors duration-300 icon icon-cart-empty group-hover:fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 86.8 77.5"
                  style={{
                    width: "20px",
                    height: "20px",
                    fill: "currentColor",
                  }}
                  xmlSpace="preserve"
                >
                  <path d="M68.7,77.5c-5.6,0-10.1-4.5-10.1-10.1s4.5-10.1,10.1-10.1s10.2,4.5,10.2,10.1C78.9,73,74.3,77.5,68.7,77.5z M68.7,62.6  c-2.6,0-4.7,2.2-4.7,4.8c0,2.6,2.2,4.7,4.8,4.7s4.7-2.2,4.7-4.8C73.5,64.8,71.3,62.6,68.7,62.6z"></path>
                  <polygon points="23.4,51.5 12.4,5.4 0,5.4 0,0 16.7,0 27.8,46.1 73.4,46.1 80,19.9 48,19.9 48,14.5 86.8,14.5 77.7,51.5 "></polygon>
                  <path d="M29.9,77.5c-5.5,0-10.1-4.7-10.1-10.2S24.5,57.2,30,57.2c5.6,0,10.1,4.6,10.1,10.2C40,73,35.4,77.5,29.9,77.5z M29.9,62.6  c-2.6,0-4.7,2.2-4.7,4.8c0,2.5,2.2,4.7,4.7,4.7c2.6,0,4.7-2.2,4.7-4.8C34.6,64.8,32.4,62.6,29.9,62.6z"></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="/favourite" className="group">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="heart"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="transition-colors duration-300 svg-inline--fa fa-heart fa-w-16 fa-1x icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    fill: "currentColor",
                  }}
                >
                  <path
                    fill="currentColor"
                    className="text-black group-hover:text-[#F68E56]"
                    d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"
                  ></path>
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="group">
                <svg
                  className="transition-colors duration-300 group-hover:stroke-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="17" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="17" y1="18" x2="3" y2="18"></line>
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="h-[100px]"></div>
    </div>
  );
};

export default Header;
