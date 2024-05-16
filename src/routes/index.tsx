import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const RouterComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<h1>Đây Là Trang Home</h1>} />
          <Route index element={<h1>Home</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default RouterComponent;
