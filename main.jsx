import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import { BrowserRouter } from "react-router-dom";
import "./assets/index.css";
import "./assets/css/slide.css";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </React.Fragment>
);
