import React from "react";
import ReactDOM from "react-dom/client";
import App from "./index.tsx";
import { BrowserRouter } from "react-router-dom";
import ClientProvider from "./lib/query-client.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClientProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClientProvider>
  </React.StrictMode>
);
