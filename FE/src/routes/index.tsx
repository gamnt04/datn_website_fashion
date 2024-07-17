import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ListCart from "../pages/Client/(Cart)/[ListCart]";
// import Favourite from "../pages/Client/Favourite/Favourite";
import FAQ from "../pages/Client/Pages/FAQ/FAQs";
import AboutUS from "../pages/Client/Pages/About-us/About_us";
import Delivery from "../pages/Client/Pages/Delivery/Delivery";
import Pay from "../pages/Client/pay/Pay";
import Blogs from "../pages/Client/Blogs/Blogs";
import DetailBlogs from "../pages/Client/DetailBlogs/DetailBlogs";
import AllOrder from "../pages/Client/Order/AllOrder/AllOrder";
import Contact from "../pages/Client/Contact/Contact";
import Login from "../pages/Client/User/Login";
import Register from "../pages/Client/User/Register";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ClientLayout from "../layouts/ClientLayout";
import Category from "../pages/Admin/Category/List";
import OrderList from "../pages/Admin/Orders/OrderList";
import OrdersDetali from "../pages/Admin/Orders/OrdersDetali";
import IndexHome from "../pages/Client/(Home)/page";
import IndexShops from "../pages/Client/(Shop)/page";
import ProductDetail from "../pages/Client/(ProductDetail)/page";
import Profile from "../pages/Client/Profile/Profile";
import Order_All from "../pages/Client/Order/Order-All/Order_All";
import Address from "../pages/Client/Profile/Address";
import ListProduct from "../pages/Admin/Product/ListProduct";
import AddProduct from "../pages/Admin/Product/AddProducts/Index";
import UpdateProduct from "../pages/Admin/Product/AddProducts/EditProduct";
import TrashProduct from "../pages/Admin/Product/TrashProduct";
import BlogList from "../pages/Admin/Blogs/BlogList";
import ContactForm from "../pages/Client/Contact/Contact";
import ListContact from "../pages/Admin/contact/ListContact";
import Page from "../pages/Admin/Product/page";
import OrderDetail from "../pages/Client/Order/OrderDetail/OrderDetail";
const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<IndexHome />} />
            <Route path="/shops" element={<IndexShops />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/cart" element={<ListCart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/cart/pay" element={<Pay />} />
            {/* <Route path="favourite" element={<Favourite />} /> */}
            <Route path="delivery" element={<Delivery />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="about-us" element={<AboutUS />} />
            {/* <Route path="products" element={<ListProducts />} /> */}
            <Route path="blogs/detailblog" element={<DetailBlogs />} />
            <Route path="shops/detail_product/:id" element={<ProductDetail />} />
            <Route path="/allorder" element={<AllOrder />}>
              <Route index element={<Profile />} />
              <Route path="/allorder/order" element={<Order_All />} />
              <Route path="/allorder/order/:id/detail" element={<OrderDetail />} />
              <Route path="/allorder/address" element={<Address />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="login/register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/category" element={<Category />} />
            <Route path="products" element={<ListProduct />} />
            <Route path="product" element={<Page />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<UpdateProduct />} />
            <Route path="products/trash" element={<TrashProduct />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="/admin/orders/:id/orderDetali" element={<OrdersDetali />} />
            <Route path="/admin/contact" element={<ListContact />} />
            <Route path="blogs" element={<BlogList />} />
          </Route>
        </Routes>
        {/* <ToastContainer /> */}
      </Router>
    </>
  );
};

export default RouterComponent;
