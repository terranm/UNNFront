import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ScrollTop from "utils/ScrollToTop";
import { deleteConsole } from "utils/DeleteConsol";

deleteConsole();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ScrollTop />
    <App />
  </BrowserRouter>
);

reportWebVitals();
