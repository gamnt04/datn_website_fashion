import React from "react";
import RouterComponent from "./routes";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay-ts";
import { useContext } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoadingProvider, {
  LoadingContext,
} from "./pages/Client/Order/Order-All/LoadingContext"; // Import the provider component
import { WebSocketProvider } from "./WebSocketContext";

const App = () => {
  const { isActive } = useContext(LoadingContext);
  return (
    <GoogleOAuthProvider clientId="952541671937-4hv2c9lrhp31bqlvljr4chgvp4iafnqd.apps.googleusercontent.com">
      <LoadingProvider>
        <WebSocketProvider>
          <LoadingOverlay active={isActive} spinner text="Loading">
            <RouterComponent />
            <ToastContainer position="bottom-right" />
          </LoadingOverlay>
        </WebSocketProvider>
      </LoadingProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
