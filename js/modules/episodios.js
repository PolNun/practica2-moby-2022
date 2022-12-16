import ApiContentHandler from "./apiContentHandler.js";

export default class EpisodesPage {

    static init() {
        ApiContentHandler.getData("episode")
            .then(episodes => {
                const cards = episodes.map(episode => EpisodesPage.createEpisodeCard(episode));
                document.getElementById("episodes-mount").append(...cards);
            });

        document.getElementById("search-episode-button").addEventListener("click", () => {
            const name = document.getElementById("search-episode-input").value;
            this.searchEpisode(name);
        });

        document.getElementById("load-episodes-button").addEventListener("click", () => {
            this.loadEpisodes();
        });
    }

    static createEpisodeCard({id, name, air_date, episode}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success", "w-25");
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title text-success">Episodio ${id}</h5>
                <hr>
                <p class="card-text"><strong>Nombre:</strong> ${name}</p>
                <p class="card-text"><strong>Episodio:</strong> ${episode}</p>
                <p class="card-text"><strong>Fecha de emisión:</strong>  ${air_date}</p>
            </div>
        `;
        return card;
    }

    static searchEpisode(name) {
        ApiContentHandler.getData(`episode/?name=${name}`)
            .then(episodes => {
                const cards = episodes.map(episode => EpisodesPage.createEpisodeCard(episode));
                document.getElementById("episodes-mount").innerHTML = "";
                document.getElementById("load-elements-div").innerHTML = "";
                document.getElementById("episodes-mount").append(...cards);
            });
    }

    static loadEpisodes() {
        let page = 2;
        document.getElementById("load-episodes-button").addEventListener("click", () => {
            ApiContentHandler.loadMoreData("episode", page)
                .then(episodes => {
                    const cards = episodes.map(episode => EpisodesPage.createEpisodeCard(episode));
                    document.getElementById("episodes-mount").append(...cards);
                });
            page++;
        });
    }
}