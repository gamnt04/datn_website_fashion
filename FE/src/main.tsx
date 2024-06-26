import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import "./index.css";
import { storeTitleApp } from "./Redux/Store.ts";


const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={storeTitleApp}>
      <App />
    </Provider>
  </QueryClientProvider>
);
