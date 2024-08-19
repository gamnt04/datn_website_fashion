import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Modal } from "antd";
import { Box, Heart, LogOut, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import useLogout from "../../../../common/hooks/Auth/Logout";

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
    label
  } as MenuItem;
}

const Sidebar_Profile: React.FC = () => {
  const { mutate } = useLogout();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    mutate();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const items: MenuItem[] = [
    getItem("Thông tin tài khoản", "1", <User className="h-5" />, [
      getItem(<NavLink to="/profile">Hồ sơ</NavLink>, "1-1"),
      getItem(<NavLink to="/profile/address">Địa chỉ</NavLink>, "1-2"),
      getItem(<NavLink to="">Đổi mật khẩu</NavLink>, "1-3")
    ]),
    getItem(<NavLink to="">Yêu thích</NavLink>, "2", <Heart className="h-5" />),
    getItem(<NavLink to={`/profile/list_order`}>Đơn hàng của tôi</NavLink>, "3", <Box className="h-5" />),
    {
      type: "divider"
    },
    getItem(
      <p onClick={showModal}>Đăng xuất</p>,
      "4",
      <LogOut className="h-5 " />
    )
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <>
      <Menu
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
        className="p-2"
      />
      <Modal
        title="Bạn có chắc muốn đăng xuất không?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Đăng xuất"
        cancelText="Trở lại"
      >
        <p>Tài khoản của bạn sẽ được đăng xuất</p>
      </Modal>
    </>
  );
};

export default Sidebar_Profile;
