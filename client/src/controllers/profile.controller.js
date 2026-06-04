import { navigate } from "../router/router";
import { getSession, removeSession, saveSession } from "../services/session.service";
import { searchUser } from "../services/login.service";
import { deleteUser, editUser } from "../services/profile.service";
import { deleteTaskById } from "../services/task.service";
import Swal from 'sweetalert2';

export function editUserInfo() {
    const userData = getSession();

    const editUserForm = document.getElementById("edit-user-form");
    const editUserName = document.getElementById("name");
    const editUserLastName = document.getElementById("lastName");
    const editUserEmail = document.getElementById("profile-email");
    const editUserPassword = document.getElementById("password-new");
    const deleteUserBtn = document.getElementById("delete-user");

    editUserName.value = userData.name[0].toUpperCase() + userData.name.slice(1);
    editUserLastName.value = userData.lastName[0].toUpperCase() + userData.lastName.slice(1);
    editUserEmail.value = userData.email;

    editUserForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const editedUser = {
            name: editUserName.value.trim().toLowerCase() || userData.name,
            lastName: editUserLastName.value.trim().toLowerCase() || userData.lastName,
            email: editUserEmail.value.trim().toLowerCase() || userData.email,
            password: editUserPassword.value.trim() || userData.password,
            role: userData.role,
            id: userData.id
        };

        const userExists = await searchUser(editedUser.email)

        if ((userData.email !== editedUser.email) && userExists) {

            Swal.fire({
                position: "center",
                icon: "error",
                title: "Usuario Ya existe",
                showConfirmButton: false,
                timer: 1500,
                width: "24rem"

            });

            editUserForm.reset();
            
            editUserName.value = userData.name;
            editUserEmail.value = userData.email;
            editUserLastName.value = userData.lastName;

            return

        }

        await editUser(editedUser, userData.id);
        editUserForm.reset();

        saveSession(editedUser);
        const newUserData = getSession()

        editUserName.value = newUserData.name;
        editUserEmail.value = newUserData.email;
        editUserLastName.value = newUserData.lastName;

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Datos Guardados Exitosamente",
            showConfirmButton: false,
            timer: 1500,
            width: "24rem"
        });
    });

    deleteUserBtn.addEventListener("click", async () => {

        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción eliminará tu cuenta y todas tus tareas.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true
        });

        if (result.isConfirmed) {
            const userData = getSession();

            await deleteTaskById(userData.id);
            await deleteUser(userData.id);
            removeSession();

            await Swal.fire({
                icon: "success",
                title: "Cuenta eliminada",
                text: "Tu cuenta ha sido eliminada correctamente."
            });

            navigate("/login");
        }
    });
}