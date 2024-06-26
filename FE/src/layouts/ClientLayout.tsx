import { Outlet } from "react-router-dom";
import Header from "../components/common/Client/Header";
import Footer from "../components/common/Client/Footer";

const ClientLayout = () => {
  return (
    <>
      <Header />
      <div className="xl:w-full xl:flex xl:justify-center">
        <div className="xl:w-[1440px]">
          <Outlet />
        </div>
      </div>
      <Footer />

    </>
  );
};

export default ClientLayout;
