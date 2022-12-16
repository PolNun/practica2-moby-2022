export default class ApiContentHandler {
    static API_RICK_AND_MORTY = "https://rickandmortyapi.com/api";

    static getData(resource) {
        return fetch(`${ApiContentHandler.API_RICK_AND_MORTY}/${resource}`)
            .then(response => response.json())
            .then(({results}) => results);
    }

    static getSingleData(resource, id) {
        return fetch(`${ApiContentHandler.API_RICK_AND_MORTY}/${resource}/${id}`)
            .then(response => response.json());
    }
}