import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
<<<<<<< HEAD
import Blogs from "../pages/Client/Blogs/Blogs";
=======

import ListCart from "../pages/Client/Cart/ListCart";
import Favourite from "../pages/Client/Favourite/Favourite";
import FAQ from "../pages/Client/Pages/FAQ/FAQs";
import AboutUS from "../pages/Client/Pages/About-us/About_us";
import Delivery from "../pages/Client/Pages/Delivery/Delivery";
import Header from "../components/Header";
import Footer from "../components/Footer";


>>>>>>> a80637914551f8a1453387b71fc72ac43ec57561
const RouterComponent = () => {
  return (
    <>
      <Router>
      <Header></Header>
 
        <Routes>
          <Route path="/" element={<h1>Đây Là Trang Home</h1>} />
          <Route index element={<h1>Home</h1>} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
};

export default RouterComponent;
