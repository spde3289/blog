import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter basename="/blog">
    <ScrollToTop />
    <App />
  </BrowserRouter>
);
