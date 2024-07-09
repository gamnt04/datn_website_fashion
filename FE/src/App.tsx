import RouterComponent from "./routes";
import { useSelector } from "react-redux";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const App = () => {
  const dispatch = useSelector((state) => state.titleApp);

  useEffect(() => {
    ((typeof window) !== 'undefined') && (
      document.title = dispatch
    )
  }, [dispatch])

  return (
    <>
      <RouterComponent />
      <ToastContainer />
    </>
  );
};
export default App;
