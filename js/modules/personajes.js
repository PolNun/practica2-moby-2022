import ApiContentHandler from "./apiContentHandler.js";

export default class Characters {
    static init() {
        const personajes = new Characters();
        ApiContentHandler.getCharacters()
            .then(characters => {
                const cards = characters.map(character => personajes.createCharacterCard(character));
                document.querySelector(".cards-mount").append(...cards);
            });
    }

    createCharacterCard({name, image}) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-img-top" title="${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
            </div>
        `;
        return card;
    }


}