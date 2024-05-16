import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Blogs from "../pages/Client/Blogs/Blogs";
const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Đây Là Trang Home</h1>} />
          <Route index element={<h1>Home</h1>} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
