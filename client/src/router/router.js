import { showAllUsers } from "../controllers/admin.controller.js";
import { AccessUser, registerUser } from "../controllers/auth.controller.js";
import { showUserInfo } from "../controllers/dashboard.controller.js";
import { editUserInfo } from "../controllers/profile.controller.js";
import { createEditTask, showUserTasks } from "../controllers/tasks.controller.js";
import { getSession } from "../services/session.service.js";
import { admin } from "../views/admin.js";
import { dashboard } from "../views/dashboard.js";
import { home } from "../views/home.js";
import { login } from "../views/login.js";
import { notFound } from "../views/not-found.js";
import { profile } from "../views/profile.js";
import { register } from "../views/register.js";
import { taskForm } from "../views/task-form.js";
import { tasks } from "../views/tasks.js";

const app = document.getElementById("app");

const routes = {
  "/": home,
  "/login": login,
  "/admin": admin,
  "/dashboard": dashboard,
  "/profile": profile,
  "/register": register,
  "/task-form": taskForm,
  "/tasks": tasks,
};

function runcontrollers(path) {

  if (path === "/register") {
    registerUser();
  } else if (path === "/login") {
    AccessUser();
  } else if (path === "/tasks") {
    showUserTasks();
  } else if (path === "/task-form") {
    createEditTask();
  } else if (path === "/dashboard") {
    showUserInfo();
  } else if (path === "/profile") {
    editUserInfo();
  } else if (path === "/admin") {
    showAllUsers();
  }
}

export function router(path) {

  const view = routes[path];

  if (!view) {
    app.innerHTML = notFound();
    return
  }

  const session = getSession();
  
  const publicRoutes = ["/", "/login", "/register"];

  if (!publicRoutes.includes(path) && !session) {
    history.replaceState({}, "", "/login");
    router("/login");
    return;

  } else if (publicRoutes.includes(path) && session) {
    history.replaceState({}, "", "/dashboard");
    router("/dashboard");
    return;

  } else if (path === "/admin" && session.role !== "ADMIN") {
    history.replaceState({}, "", "/dashboard");
    router("/dashboard");
    return;
  }

  app.innerHTML = view();

  const links = document.querySelectorAll("[data-link]");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      navigate(link.getAttribute("href"));

    });
  });

  runcontrollers(path);

}

export function navigate(path) {
  history.pushState({}, "", path);
  router(path);
}
