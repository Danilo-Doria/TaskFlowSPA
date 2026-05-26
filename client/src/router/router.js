import { AccessUser, registerUser } from "../controllers/auth.controller.js";
import { createEditTask } from "../controllers/tasks.controller.js";
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

export function router(path) {

  const view = routes[path] || notFound;

  app.innerHTML = view();

  if (path === "/register") {
    registerUser();
  }else if (path === "/login") {
    AccessUser();
  }else if (path === "/task") {
    
  }else if (path === "/task-form") {
    createEditTask()
  }

  const links = document.querySelectorAll("[data-link]");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const path = link.getAttribute("href");

      history.pushState({}, "", path);

      router(path);
    });
  });
}
