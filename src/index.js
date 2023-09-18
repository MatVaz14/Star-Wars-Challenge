import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StoreProvider from "./store/StoreProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
);
