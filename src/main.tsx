import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { ResumeProvider } from "./context/ResumeContext";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/500.css";
import "@fontsource/instrument-sans/600.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ResumeProvider>
        <App />
      </ResumeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
