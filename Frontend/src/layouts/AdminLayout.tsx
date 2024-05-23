import { Outlet } from "react-router-dom";
import Header from "../components/common/Admin/Header";
import SidebarComponent from "../components/common/Admin/Sidebar";
// import "./style.css";
const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <div className={`fixed z-50 sm:static`}>
          <SidebarComponent />
        </div>
        <div className="flex-1 my-2 ml-20 mr-3 sm:mx-20 sm:custom-margin-left">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
