import {
  Folder,
  BarChart3,
  Boxes,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Receipt,
  Settings,
  UserCircle,
  Truck,
  Trash,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import { useEffect, useState } from "react";

const SidebarComponent = () => {
  const location = useLocation();
  const path = location.pathname;
  const pathParts = path.split("/")[2];
  const [selectedItem, setSelectedItem] = useState(pathParts || "Dashboard");

  useEffect(() => {
    setSelectedItem(pathParts || "Dashboard");
  }, [pathParts]);

  const handleItemClick = (text: string) => {
    setSelectedItem(text);
  };

  return (
    <>
      <Sidebar>
        <Link to="/admin">
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active={selectedItem === "Dashboard"}
            onClick={() => handleItemClick("Dashboard")}
          />
        </Link>
        <SidebarItem
          icon={<BarChart3 size={20} />}
          text="Statistics"
          active={selectedItem === "Statistics"}
          onClick={() => handleItemClick("Statistics")}
        />
        <SidebarItem
          icon={<UserCircle size={20} />}
          text="Tài khoản"
          active={selectedItem === "Tài khoản"}
          onClick={() => handleItemClick("Tài khoản")}
        />
        <Link to="products">
          <SidebarItem
            icon={<Boxes size={20} />}
            text="Sản phẩm"
            active={selectedItem === "products"}
            onClick={() => handleItemClick("products")}
          />
        </Link>
        <Link to="category">
          <SidebarItem
            icon={<Folder size={20} />}
            text="Danh mục"
            active={selectedItem === "category"}
            onClick={() => handleItemClick("category")}
          />
        </Link>
        <Link to="/admin/contact">
          <SidebarItem
            icon={<Package size={20} />}
            text="Contact"
            active={selectedItem === "contact"}
            onClick={() => handleItemClick("contact")}
          />
        </Link>
        <Link to="/admin/products/trash">
          <SidebarItem
            icon={<Trash size={20} />}
            text="Thùng rác"
            active={selectedItem === "trash"}
            onClick={() => handleItemClick("trash")}
          />
        </Link>
        <Link to="orders">
          <SidebarItem
            icon={<Truck size={20} />}
            text="Orders"
            active={selectedItem === "Orders"}
            onClick={() => handleItemClick("Orders")}
          />
        </Link>

        <SidebarItem
          icon={<Receipt size={20} />}
          text="Billings"
          active={selectedItem === "Billings"}
          onClick={() => handleItemClick("Billings")}
        />

        <hr className="my-3" />
        <SidebarItem
          icon={<Settings size={20} />}
          text="Settings"
          active={selectedItem === "Settings"}
          onClick={() => handleItemClick("Settings")}
        />
        <SidebarItem
          icon={<LifeBuoy size={20} />}
          text="Help"
          active={selectedItem === "Help"}
          onClick={() => handleItemClick("Help")}
        />
      </Sidebar>
    </>
  );
};

export default SidebarComponent;
