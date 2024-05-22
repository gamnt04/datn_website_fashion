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
import Home from "../pages/Client/Home/Home";
import Contact from "../pages/Client/Contact/Contact";
import Login from "../pages/Client/User/Login";
import Register from "../pages/Client/User/Register";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ClientLayout from "../layouts/ClientLayout";
import Category from "../pages/Admin/Category/List";



const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClientLayout />} >
            <Route index element={<Home />} />
            <Route path="cart" element={<ListCart />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="about-us" element={<AboutUS />} />
            <Route path="cart/pay" element={<Pay />} />
            <Route path="/products" element={<ListProducts />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/detailblog" element={<DetailBlogs />} />
            <Route path="/detailP" element={<ProductDetail />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/category" element={<Category />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
