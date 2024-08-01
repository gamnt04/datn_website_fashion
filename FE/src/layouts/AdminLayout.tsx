import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Breadcrumb, Layout, Menu, MenuProps, theme } from "antd";
import { BarChart3, Folder, LayoutDashboard, Newspaper, Package, Shirt, Trash, Truck, UserCircle } from "lucide-react";

const { Content, Footer, Sider } = Layout;

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
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin">Dashboard</NavLink>, "1", <LayoutDashboard />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/products">Thống kê</NavLink>, "2", <BarChart3 />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/auth">Tài khoản</NavLink>, "3", <UserCircle />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/products">Sản phẩm</NavLink>, "4", <Shirt />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/category">Danh mục</NavLink>, "5", <Folder />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/contact">Contact</NavLink>, "6", <Package />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/blogs">Blog</NavLink>, "7", <Newspaper />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/products/trash">Thùng rác</NavLink>, "8", <Trash />),
  getItem(<NavLink className='flex items-center gap-x-4' to="/admin/orders">Đơn hàng</NavLink>, "9", <Truck />),
];

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={`transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}
      >
        <div className="flex justify-center items-center p-4">
          <NavLink className='text-xl font-bold' to="/admin/products">Logo</NavLink>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
