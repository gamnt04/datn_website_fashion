import React from "react";
import Sidebar_Dashboard from "../components/common/Admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../components/common/Admin/Header/Header";

const AdminLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen flex">
      {/* Sidebar */}
      <div className="w-[290px] bg-[#1C2434] pt-4 border-r border-gray-600 fixed top-0 left-0 h-full">
        <Sidebar_Dashboard />
      </div>

      {/* Main content */}
      <div className="flex-1 ml-[290px] bg-[#F1F5F9] flex flex-col">
        <div className="fixed top-0 left-[290px] w-[calc(100%-290px)] bg-[#171821] text-gray-100 z-10">
          <Header />
        </div>
        <div className="pt-[20px] flex-1 ">
          <Outlet />
        </div>
        <div className="text-center py-4">
          Copyright by ©{new Date().getFullYear()} Created by DATN
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
