import ApiContentHandler from "./apiContentHandler.js";

export default class LocationsPage {
    static init() {
        ApiContentHandler.getData("location")
            .then(locations => {
                const cards = locations.map(location => LocationsPage.createLocationCard(location));
                document.getElementById("locations-mount").append(...cards);
            });

        document.getElementById("search-location-button").addEventListener("click", () => {
            const name = document.getElementById("search-location-input").value;
            this.searchLocation(name);
        });

        const locationsMount = document.getElementById("locations-mount");
        const btnPreviousPage = document.getElementById("btn-previous-locations");
        const btnNextPage = document.getElementById("btn-next-locations");

        btnNextPage.addEventListener("click", () => {
            ApiContentHandler.nextPage(btnPreviousPage, btnNextPage, "location", locationsMount, this.createLocationCard);
        });
    }

    static createLocationCard({name, type, dimension}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success", "w-25");
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <hr>
                <p class="card-text">Tipo: ${type}</p>
                <p class="card-text">Dimensión: ${dimension}</p>
            </div>
        `;

        return card;
    }

    static searchLocation(name) {
        ApiContentHandler.getData(`location/?name=${name}`)
            .then(locations => {
                const cards = locations.map(location => LocationsPage.createLocationCard(location));
                document.getElementById("locations-mount").innerHTML = "";
                document.getElementById("load-elements-div").innerHTML = "";
                document.getElementById("locations-mount").append(...cards);
            });
    }

    static loadLocations() {
        let page = 2;
        document.getElementById("load-locations-button").addEventListener("click", () => {
            ApiContentHandler.loadMoreData("location", page)
                .then(locations => {
                    const cards = locations.map(location => LocationsPage.createLocationCard(location));
                    document.getElementById("locations-mount").append(...cards);
                });
            page++;
        });
    }
}