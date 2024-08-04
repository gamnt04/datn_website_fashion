import React from "react";
import Sidebar_Dashboard from "../components/common/Admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";



const AdminLayout: React.FC = () => {

  return (
    <div className="bg-[#171821] text-gray-100 relative min-h-screen">
      <div className="sticky w-full py-2 top-0 bg-[#171821] border-b border-gray-600 z-[10]">
        <div className="flex justify-between px-4">
          <strong>Logo</strong>
          <strong>Search (thêm search vào) </strong>
          <strong>Logo user</strong>
        </div>
      </div>

      <div className="grid lg:grid-cols-[180px_auto]">
        <div className="fixed top-10 pt-4 border-r border-gray-600 max-w-[180px]">
        <Sidebar_Dashboard />
        </div>
        <div></div>
        <div className="min-h-[90vh]">
          <Outlet />
          <div className="text-center py-4">
          Copyright by ©{new Date().getFullYear()} Created by DATN
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
