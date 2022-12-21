import ApiContentHandler from "./apiContentHandler.js";

export default class CharactersPage {
    static charactersMount = document.getElementById("characters-mount");
    static charactersDetailsContainer = document.getElementById("character-details");

    static init() {
        this.characterCardClick();
        this.eventListeners();

        ApiContentHandler.getData("character")
            .then(characters => {
                const cards = characters.map(character => CharactersPage.createCharacterCard(character));
                document.getElementById("characters-mount").append(...cards);
            });

    }

    static eventListeners() {
        const btnPreviousPage = document.getElementById("btn-previous-characters");
        const btnNextPage = document.getElementById("btn-next-characters");

        document.getElementById("search-character-button").addEventListener("click" || "keydown", () => {
            const name = document.getElementById("search-character-input").value;
            this.searchCharacterByName(name);
        });

        btnNextPage.addEventListener("click", () => {
            ApiContentHandler.nextPage(btnPreviousPage, btnNextPage, "character", this.charactersMount, CharactersPage.createCharacterCard);
        });

        btnPreviousPage.addEventListener("click", () => {
            ApiContentHandler.previousPage(btnNextPage, btnPreviousPage, "character", this.charactersMount, CharactersPage.createCharacterCard);
        });

        const closeDetailsButton = document.getElementById("close-details-button");
        if (closeDetailsButton) {
            closeDetailsButton.addEventListener("click", () => {
                this.charactersMount.style.display = "block";
                this.charactersDetailsContainer.innerHTML = "";
            });
        }
    }

    static createCharacterCard({name, image}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success");
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-img-top" style="width: 160px;" title="${name}">
            <div class="card-body character-card">
                <p class="card-text">${name}</p>
            </div>
        `;

        return card;
    }

    static searchCharacterByName(name) {
        ApiContentHandler.getData(`character/?name=${name}`)
            .then(characters => {
                const cards = characters.map(character => this.createCharacterCard(character));
                document.getElementById("load-elements-div").innerHTML = "";
                document.getElementById("characters-mount").innerHTML = "";
                document.getElementById("characters-mount").append(...cards);
            });
    }

    static characterCardClick() {
        this.charactersMount.addEventListener("click", e => {
            if (e.target.classList.contains("card-img-top")) {
                const characterName = e.target.title;
                ApiContentHandler.getData(`character/?name=${characterName}`)
                    .then(character => {
                        this.charactersMount.style.display = "none";
                        const characterData = character[0];
                        const {name, status, species, episode, image, location} = characterData;
                        const episodes = episode.map(episode => episode.split("/").pop());
                        this.charactersDetailsContainer.innerHTML = `
                            <div class="bg-dark text-light rounded border-success">
                                <div class="p-3">
                                    <div class="d-flex">
                                        <h5 class="mb-3">${name}</h5>
                                        <button id="close-details-button" class="btn-close btn-close-white ms-auto"></button>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 col-md-3">
                                            <img src="${image}" alt="${name}" class="img-fluid rounded" title="${name}">
                                        </div>
                                        <div class="col-12 col-md-9 mt-2">
                                            <p><strong>Estado:</strong> ${status}</p>
                                            <p><strong>Especie:</strong> ${species}</p>
                                            <p><strong>Ubicación:</strong> ${location.name}</p>
                                            <p><strong>Episodios:</strong> ${episodes.join(", ")}</p>
                                    </div>
                                </div>
                            </div>
                        `;

                    });
            }
        });
    }
}