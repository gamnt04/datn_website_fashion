import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ListCart from "../pages/Client/Cart/ListCart";
import Favourite from "../pages/Client/Favourite/Favourite";
import FAQ from "../pages/Client/Pages/FAQ/FAQs";
import AboutUS from "../pages/Client/Pages/About-us/About_us";
import Delivery from "../pages/Client/Pages/Delivery/Delivery";
import Pay from "../pages/Client/pay/Pay";
import ListProducts from "../pages/Client/listProducts/ListProducts";
import Blogs from "../pages/Client/Blogs/Blogs";
import DetailBlogs from "../pages/Client/DetailBlogs/DetailBlogs";
import ProductDetail from "../pages/Client/ProductDetail/ProductDetail";

import Profile from "../pages/Client/Profile/Profile";
import AllOrder from "../pages/Client/Order/AllOrder/AllOrder";
import RefundRetunr from "../pages/Client/Order/RefundRetunr/RefundRetunr";
import Contact from "../pages/Client/Contact/Contact";
import Login from "../pages/Client/User/Login";
import Register from "../pages/Client/User/Register";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ClientLayout from "../layouts/ClientLayout";
import Category from "../pages/Admin/Category/List";
import OrderDetail from "../pages/Client/Order/OrderDetail/OrderDetail";
import OrderList from "../pages/Admin/Orders/OrderList";
import OrdersDetali from "../pages/Admin/Orders/OrdersDetali";
import IndexHome from "../pages/Client/(Home)/[Index]";
import IndexShops from "../pages/Client/(Shop)/[Index]";

const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<IndexHome />} />
            <Route path="/shops" element={<IndexShops />} />
            <Route path="cart" element={<ListCart />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="about-us" element={<AboutUS />} />
            <Route path="cart/pay" element={<Pay />} />

            <Route path="/admin" element={<h1>Đây là Trang Admin</h1>} />
            <Route index element={<h1>Dashboard</h1>} />

            <Route path="/admin/product" element={<h1>Products</h1>} />
            <Route path="cart" element={<ListCart />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="about-us" element={<AboutUS />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs/detailblog" element={<DetailBlogs />} />
            <Route path="/detailP" element={<ProductDetail />} />
            <Route path="/allorder" element={<AllOrder />} />
            <Route path="/allorder/refundretunr" element={<RefundRetunr />} />
            <Route path="/allorder/orderdetail" element={<OrderDetail />} />

            <Route path="/admin" element={<h1>Đây là Trang Admin</h1>} />
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="/admin/product" element={<h1>Products</h1>} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/detailblog" element={<DetailBlogs />} />
            <Route path="/products/detailP" element={<ProductDetail />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/orders/:id/orderDetali" element={<OrdersDetali />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
