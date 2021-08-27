import React from "react";
import ReactDOM from "react-dom";

import NavProvider from "./store/NavProvider";

import App from "./App";
import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <NavProvider>
      <App />
    </NavProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
