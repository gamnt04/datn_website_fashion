import { Outlet } from "react-router-dom";
import Header from "../components/common/Client/Header";
import Footer from "../components/common/Client/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header />

      <div className="xl:w-[1440px] w-[95vw] mx-auto">
        <Outlet />
      </div>

      <Footer />

    </>
  );
};

export default ClientLayout;
