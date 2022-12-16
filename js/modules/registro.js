import UserHandler from "./userHandler.js";

export default class RegisterPage {

    static async init() {
        const registro = new RegisterPage();
        document.getElementById("register-button")
            .addEventListener("click", () => registro.register());

        registro.validateUsername();
        registro.validateEmail();
        registro.validatePassword();
        registro.validatePasswordConfirm();
    }

    async register() {
        const name = document.getElementById("register-username").value;
        const mail = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        const response = await fetch(`${UserHandler.AUTH_API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                mail,
                password
            })
        });
        UserHandler.responseHandler(await response.json());
    }

    validateUsername() {
        const username = document.getElementById("register-username");
        const usernameErrorMessage = document.getElementById("username-error");
        const regexUsername = /^[a-zA-Z0-9._-]{5,15}$/;

        username.addEventListener("blur", () => {
            if (!regexUsername.test(username.value)) {
                usernameErrorMessage.classList.add("text-danger");
                usernameErrorMessage.innerHTML = "El nombre de usuario debe tener entre 5 y 15 caracteres";
            } else {
                usernameErrorMessage.classList.remove("text-danger");
                usernameErrorMessage.innerHTML = "";
            }
        });
    }

    validateEmail() {
        const email = document.getElementById("register-email");
        const emailErrorMessage = document.getElementById("email-error");
        const regexEmail = /^[a-zA-Z0-9._-]{3,50}@[a-zA-Z0-9.-]{3,50}\.[a-zA-Z]{2,4}$/;

        email.addEventListener("blur", () => {
            if (!regexEmail.test(email.value)) {
                emailErrorMessage.classList.add("text-danger");
                emailErrorMessage.innerHTML = "El email no es válido";
            } else {
                emailErrorMessage.classList.remove("text-danger");
                emailErrorMessage.innerHTML = "";
            }
        });
    }

    validatePassword() {
        const password = document.getElementById("register-password");
        const passwordErrorMessage = document.getElementById("password-error");
        const regexPassword = /[a-zA-Z\d]{8,30}$/;

        password.addEventListener("blur", () => {
            if (!regexPassword.test(password.value)) {
                passwordErrorMessage.classList.add("text-danger");
                passwordErrorMessage.innerHTML = "La contraseña debe tener entre 8 y 30 caracteres";
            } else {
                passwordErrorMessage.classList.remove("text-danger");
                passwordErrorMessage.innerHTML = "";
            }
        });
    }

    validatePasswordConfirm() {
        const password = document.getElementById("register-password");
        const passwordConfirm = document.getElementById("register-password-confirm");
        const passwordErrorMessage = document.getElementById("password-confirm-error");
        passwordConfirm.addEventListener("blur", () => {
            if (password.value !== passwordConfirm.value) {
                passwordErrorMessage.classList.add("text-danger");
                passwordErrorMessage.innerHTML = "Las contraseñas no coinciden";
            } else {
                passwordErrorMessage.classList.remove("text-danger");
                passwordErrorMessage.innerHTML = "";
            }
        });
    }
}