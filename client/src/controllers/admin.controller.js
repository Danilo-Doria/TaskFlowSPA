import { navigate } from "../router/router";
import { consultUsers } from "../services/admin.service";
import { searchUser } from "../services/login.service";
import { deleteUser, editUser } from "../services/profile.service";
import { getSession, saveSession } from "../services/session.service";
import { consultAllTasks, deleteTask, deleteTaskById, editTask } from "../services/task.service";
import { renderTasksAdmin, renderUsersAdmin } from "../services/uiAdmin.service";
import Swal from 'sweetalert2';

export async function showAllUsers() {

    // EDIT USER FORM
    const editModal = document.getElementById("edit-modal");
    const editForm = document.getElementById("edit-form");
    const editName = document.getElementById("edit-name");
    const editLastname = document.getElementById("edit-lastname");
    const editEmail = document.getElementById("edit-email");
    const editPassword = document.getElementById("edit-password");
    const editRole = document.getElementById("edit-role");
    const closeModal = document.getElementById("close-modal");

    // EDIT TASK FORM
    const editTaskModal = document.getElementById("edit-task-modal");
    const editTaskForm = document.getElementById("edit-task-form");
    const editTaskTitle = document.getElementById("edit-task-title");
    const editTaskDescription = document.getElementById("edit-task-description");
    const editTaskStatus = document.getElementById("edit-task-status");
    const editTaskDate = document.getElementById("edit-task-date");
    const closeEditModal = document.getElementById("cancel-edit-btn");

    let userId = null;
    let taskId = null;

    async function refreshAdminView() {

        const usersList = await consultUsers();
        const tasksList = await consultAllTasks();

        renderUsersAdmin(usersList);
        renderTasksAdmin(tasksList);


        // EDIT USER BUTTONS
        const editUserBtn = document.querySelectorAll(".edit-user-btn");

        editUserBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                editModal.classList.remove("hidden");

                userId = btn.dataset.id;
                editName.value = btn.dataset.name;
                editLastname.value = btn.dataset.lastname;
                editEmail.value = btn.dataset.email;
                editPassword.value = btn.dataset.password;
                editRole.value = btn.dataset.role;
            });
        });

        // DELETE USER BUTTONS
        const deleteUserBtn = document.querySelectorAll(".delete-user-btn");

        deleteUserBtn.forEach(btn => {
            btn.addEventListener("click", async () => {
                userId = btn.dataset.id;

                const result = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "Esta acción eliminará al usuario y todas sus tareas.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    reverseButtons: true
                });

                if (result.isConfirmed) {
                    await deleteTaskById(userId);
                    await deleteUser(userId);
                    await refreshAdminView();
                }
            });
        });

        //  DELETE TASK BUTTONS
        const deleteTaskBtn = document.querySelectorAll(".delete-task-btn");

        deleteTaskBtn.forEach(btn => {
            btn.addEventListener("click", async () => {
                const taskIdToDelete = btn.dataset.id; // Cambiado el nombre para no chocar

                const result = await Swal.fire({
                    title: "¿Estás seguro?",
                    text: "Esta acción eliminará la tarea.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    reverseButtons: true
                });

                if (result.isConfirmed) {
                    await deleteTask(taskIdToDelete);
                    await refreshAdminView();
                }
            });
        });

        //  EDIT TASK BUTTONS
        const editTaskBtn = document.querySelectorAll(".edit-task-btn");

        editTaskBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                editTaskModal.classList.remove("hidden");

                taskId = btn.dataset.id;
                editTaskTitle.value = btn.dataset.title;
                editTaskDescription.value = btn.dataset.description;
                editTaskStatus.value = btn.dataset.status;
                editTaskDate.value = btn.dataset.date;
            });
        });
    }

    await refreshAdminView();
    const sessionUser = getSession();

    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editedUser = {
            name: editName.value.trim().toLowerCase(),
            lastName: editLastname.value.trim().toLowerCase(),
            email: editEmail.value.trim().toLowerCase(),
            password: editPassword.value.trim(),
            role: editRole.value
        }
        
        const userExists = await searchUser(editedUser.email)

        if ((sessionUser.email !== editedUser.email) && userExists) {

            Swal.fire({
                position: "center",
                icon: "error",
                title: "Usuario con correo exsistente",
                showConfirmButton: false,
                timer: 1500,
                width: "24rem"
                
            });
            editModal.classList.add("hidden");
            return
        }

            await editUser(editedUser, userId);

            editModal.classList.add("hidden");
            await refreshAdminView();

            Swal.fire({
                position: "center",
                icon: "success",
                title: "Datos Editados Exitosamente",
                showConfirmButton: false,
                timer: 1500,
                width: "24rem"
            });


            if (userId === sessionUser.id) {
                const newSession = await searchUser(editedUser.email);
                saveSession(newSession[0]);
            }

            if (userId === sessionUser.id && editedUser.role === "USER") {
                navigate("/dashboard")
            }
        });

    closeModal.addEventListener("click", () => {
        editForm.reset();
        editModal.classList.add("hidden");
    });

    editTaskForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editedTask = {
            title: editTaskTitle.value.trim(),
            description: editTaskDescription.value.trim(),
            status: editTaskStatus.value,
            date: editTaskDate.value
        }

        await editTask(editedTask, taskId);
        editTaskModal.classList.add("hidden");
        await refreshAdminView();
    });

    closeEditModal.addEventListener("click", () => {
        editTaskForm.reset();
        editTaskModal.classList.add("hidden");
    });
}