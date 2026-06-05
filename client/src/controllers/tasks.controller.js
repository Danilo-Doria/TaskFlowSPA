import { navigate } from "../router/router";
import { getSession } from "../services/session.service";
import { consultTasksById, createTask, deleteTask, editTask } from "../services/task.service";
import { renderTasks } from "../services/uiTasks.service";
import Swal from 'sweetalert2';

let editTaskData = null;

// TASKS VIEW
export async function showUserTasks() {
    const currentUser = getSession();
    const tasks = await consultTasksById(currentUser.id);

    renderTasks(tasks.reverse());

    const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");
    const editTaskBtn = document.querySelectorAll(".edit-task-btn");

    // EDIT BUTTONS
    editTaskBtn.forEach(btn => {
        btn.addEventListener("click", () => {

            const taskTitle = btn.dataset.title;
            const taskDescription = btn.dataset.description;
            const taskStatus = btn.dataset.status;
            const taskDate = btn.dataset.date;
            const taskId = btn.dataset.id;
            const userId = btn.dataset.userId;

            editTaskData = {
                title: taskTitle,
                description: taskDescription,
                status: taskStatus,
                date: taskDate,
                id: taskId
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
                await deleteTask(btn.dataset.id);
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
            createEditDescription.value = editTaskData.description,
            createEditStatus.value = editTaskData.status,
            createEditDate.value = editTaskData.date
    }

    // CREATE/EDIT TASK FORM
    createEditTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const task = {
            title: createEditTitle.value.trim(),
            description: createEditDescription.value.trim(),
            status: createEditStatus.value,
            date: createEditDate.value,
            userId: currentUser.id
        }

        if (editTaskData) {
            await editTask(task, editTaskData.id);
        } else {
            await createTask(task);
        }

        editTaskData = null;
        navigate("/tasks")
    });

    cancelBtn.addEventListener("click", () => {
        editTaskData = null;
        navigate("/tasks")
    })
}
