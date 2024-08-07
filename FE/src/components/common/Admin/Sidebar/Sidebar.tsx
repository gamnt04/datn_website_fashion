import { Box, Contact, Folder, LayoutDashboard, Newspaper, Shirt, Trash2, User } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar_Dashboard() {

  return (
    <aside className="h-screen w-fit *:flex *:items-center *:gap-x-4 *:py-2 *:px-4 *:rounded *:text-sm *:font-medium flex flex-col gap-y-2 px-4">
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={''}><LayoutDashboard /> Dashboard</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/category'}><Folder /> Danh mục</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/products'}><Shirt />  Sản phẩm</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/auth'}><User />  Tài khoản</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/orders'}><Box /> Đơn hàng</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/contact'}><Contact />  Liên hệ</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/blogs'}><Newspaper />  Blog</NavLink>
      <NavLink className={({ isActive }) => isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"} to={'/admin/trash'}><Trash2 />  Thùng rác</NavLink>

    </aside>
  );
}
