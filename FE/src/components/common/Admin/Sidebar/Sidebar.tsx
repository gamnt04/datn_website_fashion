import {
  Box,
  ChevronDown,
  Contact,
  LayoutDashboard,
  Palette,
  Shirt,
  Trash2,
  User2
} from "lucide-react";
import { useState } from "react";
import logo from "../../../../assets/Images/Logo/logo white.png";
import { Link, NavLink } from "react-router-dom";

export default function Sidebar_Dashboard() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleExpand = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <aside className="h-screen w-[290px] text-gray-100 *:text-sm *:font-medium flex flex-col gap-y-3 px-6">
      <div className="items-center py-1">
        <img src={logo} alt="" className="w-[242px] h-[45px]" />
      </div>

      <div>
        <div>
          <button
            onClick={() => toggleExpand("dashboard")}
            className="flex bg-[#333A48] items-center gap-x-4 py-3  w-full text-left"
          >
            <LayoutDashboard />
            <span className="text-[16px] text-[#c4cee3]">Bảng điều khiển</span>
            <ChevronDown
              className={`ml-auto transform ${
                expandedSection === "dashboard" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "dashboard" && (
            <div className="ml-8 mt-2">
              <NavLink
                to="/admin"
                className="flex items-center px-2 py-3  hover:text-white text-[16px] text-gray-300"
              >
                Tổng quan
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div>
        <div>
          <button
            onClick={() => toggleExpand("products")}
            className="flex items-center gap-x-4 py-3  w-full text-left"
          >
            <Shirt />
            <span className="text-[16px] text-[#c4cee3]">Sản phẩm</span>
            <ChevronDown
              className={`ml-auto transform ${
                expandedSection === "products" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "products" && (
            <div className="ml-8 mt-2">
              <NavLink
                to="/admin/products"
                className="flex items-center px-2 py-3  hover:text-white text-[16px] text-gray-300"
              >
                Danh sách sản phẩm
              </NavLink>
              <NavLink
                to="/admin/products/add"
                className="flex items-center px-2 py-3  hover:text-white text-[16px] text-gray-300"
              >
                Thêm mới sản phẩm
              </NavLink>
              <NavLink
                to="/admin/category"
                className="flex items-center px-2 py-3  hover:text-white text-[16px] text-gray-300"
              >
                Quản lý danh mục
              </NavLink>
            </div>
          )}
        </div>
      </div>
      <div>
        <div>
          <button
            onClick={() => toggleExpand("attribute")}
            className="flex items-center gap-x-4 py-3  w-full text-left"
          >
            <Palette />
            <span className="text-[16px] text-[#c4cee3]">Thuộc Tính</span>
            <ChevronDown
              className={`ml-auto transform ${
                expandedSection === "attribute" ? "rotate-180" : ""
              }`}
            />
          </button>

          {expandedSection === "attribute" && (
            <div className="ml-8 mt-2">
              <NavLink
                to="/admin/products"
                className="flex items-center px-2 py-3  hover:text-white text-[16px] text-gray-300"
              >
                Màu sắc
              </NavLink>
              <NavLink
                to="/admin/products/add"
                className="flex items-center px-2 py-3  hover:text-white text-[16px] text-gray-300"
              >
                Kích Cỡ
              </NavLink>
            </div>
          )}
        </div>
      </div>

      <div>
        <Link
          to={`/admin/orders`}
          className="flex items-center gap-x-4 py-3  w-full text-left"
        >
          <Box />
          <span className="text-[16px] text-[#c4cee3]">Đơn Hàng</span>
        </Link>
      </div>
      <div>
        <Link
          to={`/admin/auth`}
          className="flex items-center gap-x-4 py-3  w-full text-left"
        >
          <User2 />
          <span className="text-[16px] text-[#c4cee3]">Tài khoản</span>
        </Link>
      </div>
      <div>
        <Link
          to={`/admin/contact`}
          className="flex items-center gap-x-4 py-3  w-full text-left"
        >
          <Contact />
          <span className="text-[16px] text-[#c4cee3]">Liên hệ</span>
        </Link>
      </div>

      <div>
        <Link
          to={`/admin/blogs`}
          className="flex items-center gap-x-4 py-3  w-full text-left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-letter-text"
          >
            <path d="M15 12h6" />
            <path d="M15 6h6" />
            <path d="m3 13 3.553-7.724a.5.5 0 0 1 .894 0L11 13" />
            <path d="M3 18h18" />
            <path d="M4 11h6" />
          </svg>
          <span className="text-[16px] text-[#c4cee3]">Bài viết</span>
        </Link>
      </div>
      <div>
        <Link
          to={`/admin/trash`}
          className="flex items-center gap-x-4 py-3  w-full text-left"
        >
          <Trash2 />
          <span className="text-[16px] text-[#c4cee3]">Thùng rác</span>
        </Link>
      </div>
    </aside>
  );
}
