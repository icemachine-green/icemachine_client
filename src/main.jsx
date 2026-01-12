import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store/index.js";
import { Provider } from "react-redux";
import Router from "./routes/Router.jsx";
import swRegister from './swRegister.js';

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router />
  </Provider>
);

// 서비스 워커 등록 처리
swRegister();