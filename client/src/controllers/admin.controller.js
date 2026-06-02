import { consultUsers, editUser } from "../services/admin.service";
import { searchUser } from "../services/login.service";
import { getSession, saveSession } from "../services/session.service";
import { renderUsers } from "../services/uiUsers.service";
import Swal from 'sweetalert2';

export async function showAllUsers() {

    const editModal = document.getElementById("edit-modal");
    const editForm = document.getElementById("edit-form");
    const editName = document.getElementById("edit-name");
    const editLastname = document.getElementById("edit-lastname");
    const editEmail = document.getElementById("edit-email");
    const editPassword = document.getElementById("edit-password");
    const editRole = document.getElementById("edit-role");
    const colseModal = document.getElementById("close-modal");

    let userId = null;

    async function refreshAdminView() {

        const usersList = await consultUsers();

        renderUsers(usersList);

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
    }

    await refreshAdminView();

    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editedUser = {
            name: editName.value.trim().toLowerCase(),
            lastName: editLastname.value.trim().toLowerCase(),
            email: editEmail.value.trim().toLowerCase(),
            password: editPassword.value.trim(),
            role: editRole.value
        }

        await editUser(editedUser, userId);

        const sessionUserId = getSession();

        if (userId === sessionUserId.id) {
            const newSession = await searchUser(editedUser.email);
            saveSession(newSession[0]);
        }

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

    })

    colseModal.addEventListener("click", () => {
        editForm.reset()
        editModal.classList.add("hidden");
    })
}