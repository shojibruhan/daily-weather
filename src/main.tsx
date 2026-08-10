import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TooltipProvider } from "./components/ui/tooltip.tsx";
import "./index.css";
import ThemeProvider from "./provider/ThemeProvider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <App />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
