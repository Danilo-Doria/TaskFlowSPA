import { navigate } from "../router/router.js";
import { saveSession } from "../services/session.service.js";
import { loginUser, searchUser } from "../services/login.service";
import { createUser } from "../services/register.service.js";
import Swal from 'sweetalert2';


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

        const userExists = await searchUser(newUser.email)

        try {

            if (userExists) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Usuario Existente",
                    showConfirmButton: false,
                    timer: 1500,
                    width: "24rem"
                });

                event.target.reset();

                return
                
            } else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Usuario Registrado Exitosamente",
                    showConfirmButton: false,
                    timer: 1500,
                    width: "24rem"
                });

                await createUser(newUser);
                registerForm.reset();
                navigate("/login")
            }

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

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        try {
            const user = await loginUser(email.value.trim().toLowerCase(), password.value.trim());

            if (user) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login Exitoso",
                    showConfirmButton: false,
                    timer: 1500,
                    width: "24rem"
                });

                loginForm.reset();
                saveSession(user[0]);
                navigate("/dashboard")

            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Login Fallido",
                    showConfirmButton: false,
                    timer: 1500,
                    width: "24rem"
                });

                event.target.reset();
            }


        } catch (error) {
            console.log(error.message);
        }
    })
}

