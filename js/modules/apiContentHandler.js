export default class ApiContentHandler {
    static API_RICK_AND_MORTY = "https://rickandmortyapi.com/api";

    static getData(resource) {
        return fetch(`${ApiContentHandler.API_RICK_AND_MORTY}/${resource}`)
            .then(response => response.json())
            .then(data => data.results);
    }

    static loadMoreData(resource, page) {
        return fetch(`${ApiContentHandler.API_RICK_AND_MORTY}/${resource}?page=${page}`)
            .then(response => response.json())
            .then(data => data.results.slice(0, 10));
    }
}