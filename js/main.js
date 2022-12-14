class Main {

    async getHTMLContent(url, method = "GET") {
        return await fetch(url, {method}).then(response => response.text());
    }

    getIdFromHash() {
        let id = location.hash.slice(1);
        if (id[0] === '/') {
            id = id.slice(1);
        }
        return id || "login";
    }

    getViewUrlFromId(id) {
        return `views/pages/${id}.html`;
    }

    getModuleUrlFromId(id) {
        return `./modules/${id}.js`;
    }

    async initJS(id) {
        const moduleUrl = this.getModuleUrlFromId(id);

        try {
            const {default: module} = await import(moduleUrl);
            if (typeof module.init !== "function") {
                console.log(`El módulo ${id} no tiene un método init()`);
                return;
            }
            await module.init();
        } catch (e) {
            console.log(e);
            console.log(`No se pudo importar el módulo ${id}.js`);
        }
    }

    async loadTemplate() {
        const id = this.getIdFromHash();
        const viewUrl = this.getViewUrlFromId(id);
        document.querySelector(".forms-mount").innerHTML = await this.getHTMLContent(viewUrl);
        if (id !== "login" && id !== "registro") {
            document.querySelector(".start-image").style.display = "none";
            document.querySelector(".navbar-mount").innerHTML = await this.getHTMLContent("views/components/navbar.html");
        }
        await this.initJS(id);
    }

    async loadTemplates() {
        await this.loadTemplate();
        window.addEventListener("hashchange", () => this.loadTemplate());
    }

    async start() {
        if (location.hash === "") location.hash = "/login";

        if (localStorage.getItem("userEmail")) {
            document.getElementById("login-input-email").value = localStorage.getItem("userEmail");
        }

        await this.loadTemplates();
    }
}

const main = new Main();
await main.start();