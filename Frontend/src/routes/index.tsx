import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello</h1>}>
            <Route index element={<h1>Hello2</h1>} />
            <Route path="/cart" element={<h1>Cart1</h1>} />
          </Route>
          <Route path="/admin" element={<h1>Đây là Trang Admin</h1>}>
            <Route index element={<h1>Dashboard</h1>} />
            <Route path="/admin/product" element={<h1>Products</h1>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
