import { router } from "../router/router";


// TASKS VIEW
export function showUserTasks() {
    const taskContainer = document.getElementById("task-container");
    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
    const taskState = document.querySelectorAll(".task-state");
    const taskTitle = document.querySelectorAll(".task-title");
    const taskDescription = document.querySelectorAll(".task-description");
}


// CREATE/EDIT TASK

export function createEditTask() {
    const createEditTaskForm = document.getElementById("create-edit-task-form");
    const createEditTitle = document.getElementById("title");
    const createEditDescription = document.getElementById("description");
    const createEditStatus = document.getElementById("status");
    const createEditDate = document.getElementById("date");
    const cancelBtn = document.getElementById("cancel-btn");

    
    createEditTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        alert("hola")
    });

    cancelBtn.addEventListener("click", () => {
        router("/tasks")
    })
}
