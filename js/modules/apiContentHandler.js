export default class ApiContentHandler {
    static API_RICK_AND_MORTY = "https://rickandmortyapi.com/api";

    static getData(resource) {
        return fetch(`${ApiContentHandler.API_RICK_AND_MORTY}/${resource}`)
            .then(response => response.json())
            .then(data => data.results);
    }

    static getDataByPage(resource, page) {
        return fetch(`${ApiContentHandler.API_RICK_AND_MORTY}/${resource}?page=${page}`)
            .then(response => response.json())
            .then(data => data.results);
    }

    static previousPage(btnNextPage, btnPreviousPage, source, mountElement, createCardFunction) {
        const previousPage = parseInt(btnPreviousPage.dataset.page);
        const previousPageNumber = previousPage - 1;
        btnNextPage.dataset.page = previousPage.toString();

        if (previousPageNumber === 1 || previousPageNumber === 0) {
            btnPreviousPage.dataset.page = "1";
            btnPreviousPage.classList.add("disabled");
            btnPreviousPage.disabled = true;
        } else {
            btnPreviousPage.dataset.page = previousPageNumber.toString();
            btnPreviousPage.classList.remove("disabled");
            btnPreviousPage.disabled = false;
        }

        this.getDataByPage(source, previousPageNumber)
            .then(data => {
                const cards = data.map(element => createCardFunction(element));
                mountElement.innerHTML = "";
                mountElement.append(...cards);
            });
    }

    static nextPage(btnPreviousPage, btnNextPage, source, mountElement, createCardFunction) {
        const nextPage = parseInt(btnNextPage.dataset.page);
        const nextPageNumber = nextPage + 1;
        btnNextPage.dataset.page = nextPageNumber.toString();

        if (nextPageNumber === 1) {
            btnPreviousPage.dataset.page = "1";
            btnPreviousPage.classList.add("disabled");
            btnPreviousPage.disabled = true;
        } else {
            btnPreviousPage.dataset.page = nextPage.toString();
            btnPreviousPage.classList.remove("disabled");
            btnPreviousPage.disabled = false;
        }

        this.getDataByPage(source, nextPageNumber)
            .then(data => {
                const cards = data.map(element => createCardFunction(element));
                mountElement.innerHTML = "";
                mountElement.append(...cards);
            });
    }
}