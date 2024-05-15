import RouterComponent from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <RouterComponent />
      <ToastContainer />
      <Header />
      <Footer />
    </>
  );
};
export default App;
