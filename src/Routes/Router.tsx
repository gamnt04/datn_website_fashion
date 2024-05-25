import { Route, Routes } from "react-router-dom";
import Client_Layout from "../Layout/Client";
import IndexHome from "../Pages/Client/(Home)/Index";
import IndexShops from "../Pages/Client/(Shop)/Index";




const RouterComponent = () => {
  return (
    <>
      <Routes>
      {/* client */}
      <Route path="/" element={<Client_Layout/>}>
        <Route index element={<IndexHome/>}/>
        <Route path="/shops" element={<IndexShops/>}/>
      </Route>


      </Routes>
    </>
  );
};

export default RouterComponent;
