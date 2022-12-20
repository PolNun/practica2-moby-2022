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

    setActiveLink(id) {
        const links = document.querySelectorAll('.main-nav__link');
        links.forEach(link => {
            link.classList.remove('main-nav__link');
            if (link.href.includes(id)) link.classList.add('main-nav__link');
        });
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
        if (id === "login" || id === "registro") {
            document.querySelector("main").innerHTML = await this.getHTMLContent("views/components/forms-mount.html");
            document.querySelector(".forms-mount").innerHTML = await this.getHTMLContent(viewUrl);
        } else {
            document.querySelector("main").innerHTML = await this.getHTMLContent(viewUrl);
            document.querySelector(".navbar-mount").innerHTML = await this.getHTMLContent("views/components/navbar.html");
            // document.querySelector("footer").innerHTML = await this.getHTMLContent("views/components/footer.html");
            document.body.insertAdjacentHTML("beforeend", await this.getHTMLContent("views/components/footer.html"));
            document.getElementById("btn-logout").addEventListener("click", () => this.logout());

        }
        await this.initJS(id);
        this.setActiveLink(id);
    }

    async loadTemplates() {
        await this.loadTemplate();
        window.addEventListener("hashchange", () => this.loadTemplate());
    }

    logout() {
        localStorage.removeItem("user");
        document.querySelector("header").innerHTML = "";
        document.querySelector("footer").innerHTML = "";
        location.hash = "/login";
    }

    async start() {
        if (location.hash === "") location.hash = "/login";
        await this.loadTemplates();
    }
}

const main = new Main();
await main.start();