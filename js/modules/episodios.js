import ApiContentHandler from "./apiContentHandler.js";

export default class EpisodesPage {

    static init() {
        ApiContentHandler.getData("episode")
            .then(episodes => {
                const cards = episodes.map(episode => EpisodesPage.createEpisodeCard(episode));
                document.getElementById("episodes-mount").append(...cards);
            });
    }

    static createEpisodeCard({name, air_date, episode}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success", "w-25");
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">Fecha de emisión: ${air_date}</p>
                <p class="card-text">Episodio: ${episode}</p>
            </div>
        `;
        return card;
    }
}