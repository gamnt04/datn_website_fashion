import RouterComponent from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
const App = () => {
  return (
    <>
      <RouterComponent />
      <ToastContainer />
      <Header />
    </>
  );
};
export default App;
