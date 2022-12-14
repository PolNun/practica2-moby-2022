import UserHandler from "./userHandler.js";

export default class Registro {

    static async init() {
        const registro = new Registro();
        document.getElementById("register-button")
            .addEventListener("click", () => registro.register());

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

    validatePassword() {
        const password = document.getElementById("register-password");
        const passwordErrorMessage = document.getElementById("password-error");
    }

    validatePasswordConfirm() {
        const password = document.getElementById("register-password");
        const passwordConfirm = document.getElementById("register-password-confirm");
        const passwordErrorMessage = document.getElementById("password-confirm-error");
        passwordConfirm.addEventListener("blur", () => {
            if (password.value !== passwordConfirm.value) {
                passwordErrorMessage.classList.add("text-danger");
                passwordErrorMessage.innerHTML = "Las contraseñas no coinciden";
            }
        });
    }
}