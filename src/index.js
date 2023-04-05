import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ToastContainer autoClose={1200} />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
