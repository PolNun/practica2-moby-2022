export default class UserHandler {
    static AUTH_API = "https://api-auth-moby.herokuapp.com/api/user";

    static responseHandler({resultCode}) {
        switch (resultCode) {
            case 0:
                (location.hash === "#/login") ? location.hash = "/personajes" : location.hash = "/login";
                break;
            case 1:
                this.attachErrorMessage("Mail ya registrado");
                break;
            case 2:
                this.attachErrorMessage("Error en la validación");
                break;
            case 3:
                this.attachErrorMessage("Usuario no encontrado");
                break;
            case 4:
                this.attachErrorMessage("Contraseña inválida");
                break;
            default:
                this.attachErrorMessage("Revisá los campos");
        }
    }

    static attachErrorMessage(message) {
        document.getElementById("span-error-message").innerHTML = message;
    }

    static setUserToLocalStorage({id, name, mail, role}) {
        if (!id) return;
        localStorage.setItem("user", JSON.stringify({id, name, mail, role}));
    }
}