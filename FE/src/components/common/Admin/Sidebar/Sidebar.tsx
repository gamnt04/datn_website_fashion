import {
  Box,
  ChevronDown,
  Contact,
  LayoutDashboard,
  Shirt,
  TicketPercent,
  Trash2,
  Truck,
  User2,
} from "lucide-react";
import { useState } from "react";
import logo from "../../../../assets/Images/Logo/logo white.png";
import { Link, NavLink } from "react-router-dom";
import DailyOrderSummary from "../../../../pages/Admin/Orders/DailyOrderSummary ";
import { MdAccessAlarm } from "react-icons/md";

export default function Sidebar_Dashboard() {
  const [expandedSection, setExpandedSection] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const role = user?.user?.role;
  const toggleExpand = (section: any) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <aside className="mx-auto h-screen w-[230px] text-gray-100 *:text-sm *:font-medium flex flex-col gap-y-3">
      <div className="items-center px-2 py-1">
        <img src={logo} alt="" className="w-[242px] h-[45px]" />
      </div>

      {role === "courier" && (
        <div>
          <div className="*:px-2">
            <Link
              to={`/courier/orders`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <Box />
              <span className=" text-[#c4cee3]">Đơn Hàng</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/courier/orders`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <MdAccessAlarm className="text-2xl" />
              <span className=" text-[#c4cee3]">Thống kê</span>
            </Link>
          </div>
          <div className="*:px-2">
            <Link
              to={`/admin/DailyOrderSummary`}
              className="flex items-center w-full py-3 text-left gap-x-4"
            >
              <span className=" text-[#c4cee3]">Tổng số đơn shipper</span>
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
