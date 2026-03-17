import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "@/App";
import { Web3Provider } from "@/providers/Web3Provider";
import "@/index.css";
import "@rainbow-me/rainbowkit/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3Provider>
  </StrictMode>
);
