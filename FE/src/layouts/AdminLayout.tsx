// import { Outlet } from "react-router-dom";
// import SidebarComponent from "../components/common/Admin/Sidebar";
// // import "./style.css";
// const AdminLayout = () => {
//   return (
//     <>
//       <div className="flex">
//         <div className={`fixed z-50 sm:static`}>
//           <SidebarComponent />
//         </div>
//         <div className="flex-1 my-2 ml-20 mr-3 sm:mx-20 sm:custom-margin-left">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminLayout;


import React, { useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, Boxes, Folder, LayoutDashboard, Newspaper, Package, Trash, Truck, UserCircle } from "lucide-react";

const { Header, Content, Footer, Sider } = Layout;

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
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin"><LayoutDashboard />Dashboard</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/products"><BarChart3 /> Thống kê</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/products"><UserCircle /> tài khoản</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/products"><Boxes /> Sản phẩm</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/category"><Folder /> Danh mục</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/contact"><Package /> Contact</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/blogs"><Newspaper /> Blog</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/products/trash"><Trash /> Thùng rác</NavLink>, "2-1"),
  getItem(<NavLink className={'flex items-center gap-x-4'} to="/admin/orders"><Truck /> Đơn hàng</NavLink>, "2-1"),
];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <div className="flex justify-center items-center w-full">
          <NavLink className={'text-2xl font-bold text-center py-4'} to="/admin/products">Logo</NavLink>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 10,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright by ©{new Date().getFullYear()} Created by DNTN
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;