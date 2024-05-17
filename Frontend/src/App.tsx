import RouterComponent from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <RouterComponent />
      <ToastContainer />
    </>
  );
};
export default App;