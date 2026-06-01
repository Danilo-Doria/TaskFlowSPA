import { consultUsers } from "../services/admin.service";
import { renderUsers } from "../services/uiUsers.service";

export async function showAllUsers() {

    const usersList = await consultUsers();

    renderUsers(usersList)

    const editModal = document.getElementById("edit-modal");
    const editName = document.getElementById("edit-name");
    const editLastname = document.getElementById("edit-lastname");
    const editEmail = document.getElementById("edit-email");
    const editPassword = document.getElementById("edit-password");
    const editRole = document.getElementById("edit-role");
    const saveUser = document.getElementById("save-user");
    const colseModal = document.getElementById("close-modal");

    const editUserBtn = document.querySelectorAll(".edit-user-btn");

    editUserBtn.forEach(btn => {
        
        btn.addEventListener("click", () => {
            editModal.classList.remove("hidden");

            editName.value = btn.dataset.name;
            editLastname.value = btn.dataset.lastname;
            editEmail.value = btn.dataset.email;
            editPassword.value = btn.dataset.password;
            editRole.value = btn.dataset.role
        })
    });

    colseModal.addEventListener("click", () => {
        editModal.classList.add("hidden");
    })
}