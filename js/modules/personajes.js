import ApiContentHandler from "./apiContentHandler.js";

export default class CharactersPage {
    static init() {
        ApiContentHandler.getData("character")
            .then(characters => {
                const cards = characters.map(character => CharactersPage.createCharacterCard(character));
                document.getElementById("characters-mount").append(...cards);
            });

        document.getElementById("search-character-button").addEventListener("click", () => {
            const name = document.getElementById("search-character-input").value;
            CharactersPage.searchCharacter(name);
        });

        document.getElementById("search-character-input").addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                const name = document.getElementById("search-character-input").value;
                CharactersPage.searchCharacter(name);
            }
        });

    }

    static createCharacterCard({name, image}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success");
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-img-top" style="width: 220px;" title="${name}">
            <div class="card-body">
                <p class="card-text text-wrap">${name}</p>
            </div>
        `;

        return card;
    }

    static searchCharacter(name) {
        ApiContentHandler.getData(`character/?name=${name}`)
            .then(characters => {
                const cards = characters.map(character => CharactersPage.createCharacterCard(character));
                document.getElementById("characters-mount").append(...cards);
            });
    }
}