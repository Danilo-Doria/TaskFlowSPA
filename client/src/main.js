import { router } from "./router/router.js";
import "./styles/global.css";

// ROUTER
window.addEventListener("popstate", () => {
  router(window.location.pathname);
});

router(window.location.pathname);