import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ListCart from "../pages/Client/Cart/ListCart";
import Favourite from "../pages/Client/Favourite/Favourite";


const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Đây Là Trang Home</h1>} />
            <Route index element={<h1>Home</h1>} />
            <Route path="cart" element={<ListCart />} />
            <Route path="favourite" element={<Favourite />} />
          
          <Route path="/admin" element={<h1>Đây là Trang Admin</h1>} />
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="/admin/product" element={<h1>Products</h1>} />
          
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
