import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ListCart from "../pages/Client/(Cart)/ListCart";
// import Favourite from "../pages/Client/Favourite/Favourite";
import FAQ from "../pages/Client/Pages/FAQ/FAQs";
import AboutUS from "../pages/Client/Pages/About-us/About_us";
import Delivery from "../pages/Client/Pages/Delivery/Delivery";
import Pay from "../pages/Client/pay/Pay";
import Blogs from "../pages/Client/Blogs/Blogs";
import AllOrder from "../pages/Client/Order/AllOrder/AllOrder";
import Contact from "../pages/Client/Contact/Contact";
import Login from "../pages/Client/User/Login";
import Register from "../pages/Client/User/Register";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import ClientLayout from "../layouts/ClientLayout";
import OrderList from "../pages/Admin/Orders/OrderList";
import OrdersDetali from "../pages/Admin/Orders/OrdersDetali";
import IndexHome from "../pages/Client/(Home)/page";
import IndexShops from "../pages/Client/Shop/page";
import ProductDetail from "../pages/Client/[ProductDetail]/page";
import Profile from "../pages/Client/Profile/Profile";
import Order_Menu from "../pages/Client/Order/Order_Menu/Order_Menu";
import Address from "../pages/Client/Profile/Address";
import ListProduct from "../pages/Admin/Product/ListProduct";
import TrashProduct from "../pages/Admin/Product/TrashProduct";
import ListContact from "../pages/Admin/contact/ListContact";
import OrderDetail from "../pages/Client/Order/OrderDetail/OrderDetail";
import Favourite from "../pages/Client/Favourite/Favourite";
import List_Category from "../pages/Admin/Category/List_Category";
import BlogDetail from "../pages/Client/Blogs/BlogDetail";
import Test from "../pages/Client/TEST/Test";
import List_Auth from "../pages/Admin/Auth/List_Auth";
import Layout_Profile from "../pages/Client/Profile/layout";
import Add_Item from "../pages/Admin/Product/Add_Item";
import Edit_Item from "../pages/Admin/Product/Edit_Item";
import Blog from "../pages/Admin/Blogs/BlogList";
import LoadingProvider from "../pages/Client/Order/Order-All/LoadingContext";
import BlogAdd from "../pages/Admin/Blogs/BlogAdd";
import Logout from "../common/hooks/Auth/Logout";
import SearchResults from "../components/common/Client/SearchResults";
import BlogEdit from "../pages/Admin/Blogs/BlogEdit";
import ForgotPassword from "../pages/Client/User/ForgotPass";
import CategoryDetail from "../pages/Admin/Category/CategoryDetail";
import OrderPay from "../pages/Client/pay/oderPay";
import Layout_Review from "../pages/Client/Review/page";
import DescriptionProduct from "../pages/Client/[ProductDetail]/DescriptionProduct";
const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<IndexHome />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/shops" element={<IndexShops />} />
            <Route path="/test" element={<Test />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/cart" element={<ListCart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/cart/pay" element={<Pay />} />
            <Route path="/order/pay" element={<OrderPay />} />
            <Route path="favourite" element={<Favourite />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="faqs" element={<FAQ />} />
            <Route path="about-us" element={<AboutUS />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* <Route path="products" element={<ListProducts />} /> */}
            {/* <Route path="blogs/detailblog" element={<DetailBlogs />} /> */}
            <Route path="shops/:id" element={<ProductDetail />} />

            <Route path="shops/:id/reviews" element={<DescriptionProduct />} />
            <Route path="/profile" element={<Layout_Profile />}>
              <Route index element={<Profile />} />
              <Route path="/profile/address" element={<Address />} />
              <Route path="/profile/favourite" element={<Favourite />} />
              <Route path="/profile/allorder" element={<Order_Menu />} />
              {/* <Route path="/profile/allorder" element={<Order />} /> */}
              <Route path="/profile/order/:id" element={<OrderDetail />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="login/register" element={<Register />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="category" element={<List_Category />} />
            <Route path="category/products/:id" element={<CategoryDetail />} />
            {/* <Route path="test1" element={<Add_Item />} />
            <Route path="test2/:id" element={<Edit_Item />} /> */}
            <Route path="products/add" element={<Add_Item />} />
            <Route path="products/edit/:id" element={<Edit_Item />} />
            <Route path="products" element={<ListProduct />} />
            {/* <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<UpdateProduct />} /> */}
            <Route path="trash" element={<TrashProduct />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="auth" element={<List_Auth />} />
            <Route
              path="/admin/orders/:id/orderDetali"
              element={<OrdersDetali />}
            />
            <Route path="/admin/contact" element={<ListContact />} />

            <Route path="blogs" element={<Blog />} />

            <Route path="blogs/add_blog" element={<BlogAdd />} />
            <Route path="blogs/:id" element={<BlogEdit />} />
          </Route>
        </Routes>
        {/* <ToastContainer /> */}
      </Router>
    </>
  );
};

export default RouterComponent;
