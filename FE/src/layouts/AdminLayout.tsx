import React from "react";
import Sidebar_Dashboard from "../components/common/Admin/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { Input } from "antd";



const AdminLayout: React.FC = () => {

  return (
    <div className="relative min-h-screen">
      <div className="sticky w-full top-0 text-black z-[10]">
        <div className="flex justify-between items-center px-5 py-4 bg-black *:text-white mb-4">
          <strong>Logo</strong>
          <Input.Search className="w-1/2" />
          <img src="https://picsum.photos/300/300" alt="" className="w-8 h-8 rounded-full" />
        </div>
      </div>
      <div className="grid lg:grid-cols-[180px_auto]">
        <div className="fixed top-10 pt-4 max-w-[180px] mt-4">
          <Sidebar_Dashboard />
        </div>
        <div></div>
        <div className="min-h-[90vh] px-5">
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
