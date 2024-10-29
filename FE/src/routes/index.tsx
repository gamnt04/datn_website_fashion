import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../pages/Client/User/Login";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ClientLayout from "../layouts/ClientLayout";
import OrderList from "../pages/Admin/Orders/OrderList";
import OrdersDetali from "../pages/Admin/Orders/OrdersDetali";

import ListProduct from "../pages/Admin/Product/ListProduct";
import TrashProduct from "../pages/Admin/Product/TrashProduct";
import ListContact from "../pages/Admin/contact/ListContact";

import List_Category from "../pages/Admin/Category/List_Category";

import List_Auth from "../pages/Admin/Auth/List_Auth";
import Add_Item from "../pages/Admin/Product/Add_Item";
import Edit_Item from "../pages/Admin/Product/Edit_Item";

import ForgotPassword from "../pages/Client/User/ForgotPass";
import CategoryDetail from "../pages/Admin/Category/CategoryDetail";

import Feedback from "../pages/Admin/contact/Feedback";
import ContactDetail from "../pages/Admin/contact/ContactDetail";
import Notification from "../components/Notification/Page";
import CourierTable from "../pages/Admin/Shipper/Shipper";
import VerifyEmail from "../systems/utils/VerifyEmail";
import ChangePassword from "../pages/Client/User/ChangePassword";
import InforShipper from "../pages/Client/User/InforShipper";
import { Navigate } from "react-router-dom";
import Salary from "../pages/Admin/Shipper/Salary";
import HistoryOrder from "../pages/Admin/Orders/HistoryOrder";
import Dashboard_Shipper from "../pages/Admin/Shipper/Dashboard_Shipper";
const RouterComponent = () => {
  const isLoggedIn = () => {
    return localStorage.getItem("token") !== null;
  };
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            {/* Nếu đã đăng nhập, chuyển hướng đến trang orders */}
            <Route index element={<Login />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile/notification" element={<Notification />} />
            <Route path="/infor_shipper" element={<InforShipper />} />
          </Route>
          <Route path="courier" element={<AdminLayout />}>
            <Route path="orders" element={<OrderList />} />
            <Route path="orders_history" element={<HistoryOrder />} />
            <Route path="orders/:id/orderDetali" element={<OrdersDetali />} />
            <Route path="changePassword" element={<ChangePassword />} />
            <Route path="salary_shipper" element={<Salary />} />

            <Route path="dashboard_Shipper" element={<Dashboard_Shipper />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
