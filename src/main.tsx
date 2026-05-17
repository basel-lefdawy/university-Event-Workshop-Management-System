import { createRoot } from "react-dom/client";
import { Toaster } from "@/components/ui/sonner";
import App from "@/App";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Toaster richColors position="top-right" />
  </>
);
