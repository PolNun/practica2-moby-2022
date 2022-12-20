import ApiContentHandler from "./apiContentHandler.js";

export default class CharactersPage {
    static init() {
        const charactersMount = document.getElementById("characters-mount");
        const btnPreviousPage = document.getElementById("btn-previous-characters");
        const btnNextPage = document.getElementById("btn-next-characters");

        ApiContentHandler.getData("character")
            .then(characters => {
                const cards = characters.map(character => CharactersPage.createCharacterCard(character));
                document.getElementById("characters-mount").append(...cards);
            });

        document.getElementById("search-character-button").addEventListener("click", () => {
            const name = document.getElementById("search-character-input").value;
            CharactersPage.searchCharacterByName(name);
        });

        btnNextPage.addEventListener("click", () => {
            ApiContentHandler.nextPage(btnPreviousPage, btnNextPage, "character", charactersMount, CharactersPage.createCharacterCard);
        });

        btnPreviousPage.addEventListener("click", () => {
            ApiContentHandler.previousPage(btnNextPage, btnPreviousPage, "character", charactersMount, CharactersPage.createCharacterCard);
        });
    }

    static createCharacterCard({name, image}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success");
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-img-top" style="width: 160px;" title="${name}">
            <div class="card-body api-element">
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
}