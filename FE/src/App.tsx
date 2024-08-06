import RouterComponent from "./routes";
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay-ts";
import { LoadingContext } from "./pages/Client/Order/Order-All/LoadingContext";
import { useContext } from "react";
 // Import the provider component


const App = () => {
  const {isActive} = useContext(LoadingContext)
  console.log(isActive)
  return (
    <>
     {/* Wrap the LoadingContext component with the provider */}
    <div>
     <LoadingOverlay
      active={isActive}
      spinner
      text='Loading'
    >
      
      <RouterComponent />
      <ToastContainer position="bottom-right"/>
      </LoadingOverlay>
      </div>

    </>
  );
};
export default App;
