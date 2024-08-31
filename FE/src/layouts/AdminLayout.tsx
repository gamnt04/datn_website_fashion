import React from "react";
import Sidebar_Dashboard from "../components/common/Admin/Sidebar/Sidebar";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/common/Admin/Header/Header";
import { useAuthorization } from "../common/hooks/Auth/useAuthorization";
import { Button, Result, Spin } from "antd";

const AdminLayout: React.FC = () => {
  const { isAuthorized, isLoggedIn, isLoading } = useAuthorization("admin");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <Result
        status="warning"
        title="Bạn chưa đăng nhập"
        subTitle="Vui lòng đăng nhập để tiếp tục hành động"
        extra={
          <Button type="primary">
            <Link to="/login">Đăng nhập</Link>
          </Button>
        }
      />
    );
  }

  if (!isAuthorized) {
    return (
      <Result
        status="403"
        title="Xin lỗi, bạn không có quyền truy cập vào trang này"
        subTitle="Đăng nhập bằng tài khoản quản trị để truy cập trang này"
        extra={[
          <Button key="home">
            <Link to="/">Trở lại trang chủ</Link>
          </Button>,
          <Button type="primary" key="login">
            <Link to="/login">Đăng nhập</Link>
          </Button>,
        ]}
      />
    );
  }
  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <div className="w-[200px] bg-[#1C2434] pt-4 border-r border-gray-600 fixed top-0 left-0 h-full">
        <Sidebar_Dashboard />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-[200px] bg-[#F1F5F9] flex flex-col">
        <div className="fixed top-0 left-[200px] w-[calc(100%-200px)] bg-[#171821] text-gray-100 z-10">
          <Header />
        </div>
        <div className="pt-[20px] flex-1 ">
          <Outlet />
        </div>
        <div className="py-4 text-center">
          Copyright by ©{new Date().getFullYear()} Created by DATN
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
