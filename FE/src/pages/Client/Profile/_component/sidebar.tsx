import React from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { Box, Heart, LogOut, User } from "lucide-react";
import { NavLink } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Thông tin tài khoản", "1", <User className="h-5" />, [
    getItem(<NavLink to="/profile">Hồ sơ</NavLink>, "1-1"),
    getItem(<NavLink to="/profile/address">Địa chỉ</NavLink>, "1-2"),
    getItem(<NavLink to="">Đổi mật khẩu</NavLink>, "1-3"),
  ]),
  getItem(
    <NavLink to="/profile/favourite">Yêu thích</NavLink>,
    "2",
    <Heart className="h-5" />
  ),
  getItem(
    <NavLink to="/profile/allorder">Đơn hàng của tôi</NavLink>,
    "3",
    <Box className="h-5" />
  ),
  {
    type: "divider",
  },
  getItem(
    <NavLink to="">Đăng xuất</NavLink>,
    "4",
    <LogOut className="rotate-[180deg] h-5" />
  ),
];

const Sidebar_Profile: React.FC = () => {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
      className="p-2"
    />
  );
};

export default Sidebar_Profile;
