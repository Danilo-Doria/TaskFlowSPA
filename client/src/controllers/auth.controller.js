import { router } from "../router/router";
import { createUser } from "../services/register.service";


// REGISTER
export function registerUser() {
    const registerForm = document.getElementById("register-form");
    const registerName = document.getElementById("register-name");
    const registerLastname = document.getElementById("register-lastname");
    const registerEmail = document.getElementById("register-email");
    const registerPassword = document.getElementById("register-password");
    const registerRole = document.getElementById("register-role");

    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newUser = {
            name: registerName.value,
            lastName: registerLastname.value,
            email: registerEmail.value,
            password: registerPassword.value,
            role: registerRole.value
        }

        try {
            await createUser(newUser);
            registerForm.reset();
            history.pushState({}, "", "/login");
            router("/login");

        } catch (error) {
            console.log(error.message);
        }
    });
}

