import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import ScrollToTop from "@/utill/ScrollToTop.ts";
import { SearchProvider } from "@/context/searchContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename="/blog">
    <ScrollToTop/>
    <SearchProvider>
      <App />
    </SearchProvider>
  </BrowserRouter>
);
