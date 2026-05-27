import { router } from "../router/router";
import { consultTasks, createTask } from "../services/task.service";


// TASKS VIEW
export async function showUserTasks() {

    const data = await consultTasks();
    
    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
    const editTaskBtn = document.querySelectorAll(".edit-task-btn");
    
    editTaskBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const tasktitle = btn.getAttribute("data-title");
            const taskdescription = btn.getAttribute("data-description");
            const taskstatus = btn.getAttribute("data-status");
            const taskdate = btn.getAttribute("data-date");
            alert(`Vas a editar la tarea con ID: ${tasktitle} , ${taskdescription}, ${taskstatus}, ${taskdate}`);
        })
    })

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

        const currentUser = JSON.parse(localStorage.getItem("user"));

        const newTask = {
            title: createEditTitle.value.trim(),
            description: createEditDescription.value.trim(),
            status: createEditStatus.value,
            date: createEditDate.value,
            userId: currentUser.id
        }

        createTask(newTask);
        router("/tasks")
        history.pushState({}, "", "/tasks");
    });

    cancelBtn.addEventListener("click", () => {
        router("/tasks");
        history.pushState({}, "", "/tasks");
    })
}
