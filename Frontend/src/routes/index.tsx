import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ListCart from "../pages/Client/Cart/ListCart";
import Favourite from "../pages/Client/Favourite/Favourite";
import FAQ from "../pages/Client/Pages/FAQ/FAQs";
import AboutUS from "../pages/Client/Pages/About-us/About_us";
import Delivery from "../pages/Client/Pages/Delivery/Delivery";
import ListProducts from "../pages/Client/listProducts/ListProducts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDetail from "../pages/Client/ProductDetail/ProductDetail";

const RouterComponent = () => {
  return (
    <>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<h1>Đây Là Trang Home</h1>} />
          <Route index element={<h1>Home</h1>} />
          <Route path="cart" element={<ListCart />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="delivery" element={<Delivery />} />
          <Route path="faqs" element={<FAQ />} />
          <Route path="about-us" element={<AboutUS />} />
          <Route path="/products" element={<ListProducts />} />
          <Route path="/detailP" element={<ProductDetail />} />

          <Route path="/admin" element={<h1>Đây là Trang Admin</h1>} />
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="/admin/product" element={<h1>Products</h1>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
};

export default RouterComponent;
