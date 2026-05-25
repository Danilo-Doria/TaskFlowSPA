import { router } from "../router/router.js";
import { loginUser } from "../services/login.service";
import { createUser } from "../services/register.service.js";


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
            name: registerName.value.trim().toLowerCase(),
            lastName: registerLastname.value.trim().toLowerCase(),
            email: registerEmail.value.trim().toLowerCase(),
            password: registerPassword.value.trim(),
            role: [registerRole.value]
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

// LOGIN
export function AccessUser() {
    const loginForm = document.getElementById("login-form");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    loginForm.addEventListener("submit", async(event) => {
        event.preventDefault();

        const user = await loginUser(email.value.trim(), password.value.trim());

        console.log("USER RESPONSE:", user);

    })
}

