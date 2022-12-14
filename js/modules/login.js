import UserHandler from "./userHandler.js";

export default class Login {

    static async init() {
        const login = new Login();
        document.getElementById("login-button")
            .addEventListener("click", () => login.login());
    }

    async login() {
        const mail = document.getElementById("login-input-email").value;
        const password = document.getElementById("login-input-password").value;
        const remember = document.getElementById("remember-user").checked;

        if (remember) this.rememberUserEmail();

        const response = await fetch(`${UserHandler.AUTH_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail,
                password
            })
        });
        UserHandler.responseHandler(await response.json());
    }

    rememberUserEmail() {
        const email = document.getElementById("login-input-email").value;
        localStorage.setItem("userEmail", email);
    }


}