import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

const rootNode = document.getElementById("root");
if (rootNode) {
  const root = ReactDOM.createRoot(rootNode);
  root.render(
    <React.StrictMode>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <App />
      </HashRouter>
    </React.StrictMode>
  );
}
