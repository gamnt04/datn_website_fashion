import RouterComponent from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <RouterComponent />
      <ToastContainer />
      <div className="bg-blue-500 text-white p-4">Hello, world!</div>
    </>
  );
};
export default App;
