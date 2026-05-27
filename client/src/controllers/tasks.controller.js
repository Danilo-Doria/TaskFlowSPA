import { router } from "../router/router";
import { createUser } from "../services/register.service";
import { consultTasks, createTask } from "../services/task.service";

let editTaskData = null;
const currentUser = JSON.parse(localStorage.getItem("user"));

// TASKS VIEW
export async function showUserTasks() {

    const data = await consultTasks();

    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
    const editTaskBtn = document.querySelectorAll(".edit-task-btn");

    editTaskBtn.forEach(btn => {
        btn.addEventListener("click", () => {

            const taskTitle = btn.getAttribute("data-title");
            const taskDescription = btn.getAttribute("data-description");
            const taskStatus = btn.getAttribute("data-status");
            const taskDate = btn.getAttribute("data-date");
            const taskId = btn.getAttribute("data-id");

            editTaskData = {
                title: taskTitle,
                description: taskDescription,
                status: taskStatus,
                date: taskDate,
                id: taskId,
                userId: currentUser.id
            }

            router("/task-form");
            history.pushState({}, "", "/task-form");
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

    if (editTaskData) {
        createEditTitle.value = editTaskData.title,
        createEditDescription.value = editTaskData.description
        createEditStatus.value = editTaskData.status
        createEditDate.value = editTaskData.date  
    }


    createEditTaskForm.addEventListener("submit", async(event) => {
        event.preventDefault();

        const newTask = {
            title: createEditTitle.value.trim(),
            description: createEditDescription.value.trim(),
            status: createEditStatus.value,
            date: createEditDate.value,
            userId: currentUser.id
        }

        if (editTaskData) {
            //patch
        } else {
            await createTask(newTask);
        }
        
        editTaskData = null;
        router("/tasks");
        history.pushState({}, "", "/tasks");
        showUserTasks();
    });

    cancelBtn.addEventListener("click", () => {
        router("/tasks");
        history.pushState({}, "", "/tasks");
    })
}
