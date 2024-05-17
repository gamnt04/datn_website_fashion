import React from "react";
import {
  CartIcon,
  HeartIcon,
  NoteIcon,
  SearchIcon,
} from "../resources/svg/Icon/Icon";

const Header = () => {
  return (
    <div>
      <header className="flex items-center h-[100px]">
        <a href="#" className="w-28 h-20 mr-2 ">
          <img
            src="../../../src/resources/images/Logo/logo_chung.png"
            alt="Logo"
          />
        </a>
        <nav className="flex-grow">
          <ul className="flex justify-center gap-10 text-base font-semibold text-[#222222]">
            <li>
              <a href="#" className="border-[#f68e56] hover:border-b-2">
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
              <ul className="absolute top-full left-0 hidden bg-white border rounded-sm mt-1 w-32">
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
              <a href="#">
                <SearchIcon />
              </a>
            </li>
            <li>
              <a href="/cart">
                <CartIcon />
              </a>
            </li>
            <li>
              <a href="/favourite">
                <HeartIcon />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white transition-colors duration-300 hover:text-orange-500"
              >
                <NoteIcon />
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
