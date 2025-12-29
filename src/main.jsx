import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import Router from "./routes/Router.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);
