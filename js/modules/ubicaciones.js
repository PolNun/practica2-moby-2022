import ApiContentHandler from "./apiContentHandler.js";

export default class LocationsPage {
    static locationsMount = document.getElementById("locations-mount");
    static locationDetailsContainer = document.getElementById("location-details");

    static init() {
        this.locationCardClick();
        this.initLocationPageEventListeners();

        ApiContentHandler.getData("location")
            .then(locations => {
                const cards = locations.map(location => LocationsPage.createLocationCard(location));
                document.getElementById("locations-mount").append(...cards);
            });


    }

    static initLocationPageEventListeners() {
        const btnPreviousPage = document.getElementById("btn-previous-locations");
        const btnNextPage = document.getElementById("btn-next-locations");

        document.getElementById("search-location-button").addEventListener("click", () => {
            const name = document.getElementById("search-location-input").value;
            this.searchLocationByName(name);
        });

        btnNextPage.addEventListener("click", () => {
            ApiContentHandler.nextPage(btnPreviousPage, btnNextPage, "location", this.locationsMount, this.createLocationCard);
        });

        btnPreviousPage.addEventListener("click", () => {
            ApiContentHandler.previousPage(btnNextPage, btnPreviousPage, "location", this.locationsMount, this.createLocationCard);
        });
    }

    static createLocationCard({id, name, type, dimension}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success", "w-25");
        card.innerHTML = `
            <div class="card-body location-card" data-id="${id}">
                <h5 class="card-title">${name}</h5>
                <hr>
                <p class="card-text">Tipo: ${type}</p>
                <p class="card-text">Dimensión: ${dimension}</p>
            </div>
        `;

        return card;
    }

    static searchLocationByName(name) {
        ApiContentHandler.getData(`location/?name=${name}`)
            .then(locations => {
                const cards = locations.map(location => LocationsPage.createLocationCard(location));
                document.getElementById("locations-mount").innerHTML = "";
                document.getElementById("load-elements-div").innerHTML = "";
                document.getElementById("locations-mount").append(...cards);
            });
    }

    static locationCardClick() {
        this.locationsMount.addEventListener("click", (e) => {
            if (e.target.classList.contains("location-card")) {
                const locationId = e.target.dataset.id;
                ApiContentHandler.getDataById("location", locationId)
                    .then(location => {
                        document.getElementById("load-elements-div").hidden = true;
                        document.getElementById("search-location").hidden = true;
                        this.locationsMount.hidden = true;
                        this.createLocationDetails(location);
                    });
            }
        });
    }

    static createLocationDetails({name, type, dimension, residents}) {
        this.locationDetailsContainer.innerHTML = `
            <div class="card bg-dark text-white border-success">
                <button id="close-details-button" class="btn-close btn-close-white ms-auto p-2"></button>
                <div class="p-3">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">Tipo: ${type}</p>
                    <p class="card-text">Dimensión: ${dimension}</p>
                    <p class="card-text">Cantidad de residentes: ${residents.length}</p>
                </div>
            </div>
        `;
        this.closeDetailsButton();
    }

    static closeDetailsButton() {
        document.getElementById("close-details-button").addEventListener("click", () => {
            this.locationsMount.hidden = false;
            this.locationDetailsContainer.innerHTML = "";
            document.getElementById("search-location").hidden = false;
            document.getElementById("load-elements-div").hidden = false;
        });
    }
}