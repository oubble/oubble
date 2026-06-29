import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import { ThemeProvider } from "@/app/theme";
import { AuthProvider } from "@/app/auth";
import { App } from "@/app/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
);
