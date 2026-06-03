import { navigate } from "../router/router";
import { getSession } from "../services/session.service";
import { consultAllTasks, consultTasksById, createTask, deleteTask, editTask } from "../services/task.service";
import { renderTasks } from "../services/uiTasks.service";
import Swal from 'sweetalert2';

let editTaskData = null;

// TASKS VIEW
export async function showUserTasks() {
    const currentUser = getSession();
    let tasks = null;

    if (currentUser.role === "ADMIN") {
        tasks = await consultAllTasks();
    } else {
        tasks = await consultTasksById(currentUser.id);
    }

    renderTasks(tasks.reverse());

    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
    const editTaskBtn = document.querySelectorAll(".edit-task-btn");

    // EDIT BUTTONS
    editTaskBtn.forEach(btn => {
        btn.addEventListener("click", () => {

            const taskTitle = btn.getAttribute("data-title");
            const taskDescription = btn.getAttribute("data-description");
            const taskStatus = btn.getAttribute("data-status");
            const taskDate = btn.getAttribute("data-date");
            const taskId = btn.getAttribute("data-id");
            const userId = btn.getAttribute("data-userId");

            editTaskData = {
                title: taskTitle,
                description: taskDescription,
                status: taskStatus,
                date: taskDate,
                id: taskId,
                userId: userId
            };

            navigate("/task-form");

        })
    })

    //DELETE BUTTONS
    deleteTaskBtn.forEach(btn => {
        btn.addEventListener("click", async () => {
            const result = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Esta acción eliminará tu tarea.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, eliminar",
                cancelButtonText: "Cancelar",
                allowOutsideClick: false,
                allowEscapeKey: false,
                reverseButtons: true
            });

            if (result.isConfirmed) {
                await deleteTask(btn.getAttribute("data-id"));
                await showUserTasks();
            }
        })
    })
}


// CREATE/EDIT TASK

export function createEditTask() {
    const currentUser = getSession();

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

    createEditTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const task = {
            title: createEditTitle.value.trim(),
            description: createEditDescription.value.trim(),
            status: createEditStatus.value,
            date: createEditDate.value,
        }

        if (editTaskData) {
            await editTask(task, editTaskData.id);
            
        } else {
            task.userId = currentUser.id
            await createTask(task);

        }

        editTaskData = null;
        navigate("/tasks")
        showUserTasks();
    });

    cancelBtn.addEventListener("click", () => {
        editTaskData = null;
        navigate("/tasks")
    })
}
