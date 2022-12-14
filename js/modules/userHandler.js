export default class UserHandler {
    static AUTH_API = "https://api-auth-moby.herokuapp.com/api/user";

    static responseHandler({resultCode}) {
        switch (resultCode) {
            case 0:
                location.hash = "/home";
                break;
            case 1:
                this.attachErrorMessage("Mail ya registrado");
                break;
            case 2:
                this.attachErrorMessage("Revisá los campos");
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
}