import { router } from "./router/router.js";
import "./styles/global.css";


// ROUTER
router(window.location.pathname);

window.addEventListener("popstate", () => {
  router(window.location.pathname);
});