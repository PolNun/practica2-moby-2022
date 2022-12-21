import ApiContentHandler from "./apiContentHandler.js";

export default class EpisodesPage {
    static episodesMount = document.getElementById("episodes-mount");

    static init() {
        this.episodeCardClick();
        this.initEpisodePageEventListeners();

        ApiContentHandler.getData("episode")
            .then(episodes => {
                const cards = episodes.map(episode => this.createEpisodeCard(episode));
                document.getElementById("episodes-mount").append(...cards);
            });
    }

    static initEpisodePageEventListeners() {
        const btnPreviousPage = document.getElementById("btn-previous-episodes");
        const btnNextPage = document.getElementById("btn-next-episodes");

        document.getElementById("search-episode-button").addEventListener("click", () => {
            const name = document.getElementById("search-episode-input").value;
            this.searchEpisodeByName(name);
        });

        btnNextPage.addEventListener("click", () => {
            ApiContentHandler.nextPage(btnPreviousPage, btnNextPage, "episode", this.episodesMount, this.createEpisodeCard);
        });

        btnPreviousPage.addEventListener("click", () => {
            ApiContentHandler.previousPage(btnNextPage, btnPreviousPage, "episode", this.episodesMount, this.createEpisodeCard);
        });
    }

    static createEpisodeCard({id, name, air_date, episode}) {
        const card = document.createElement("div");
        card.classList.add("card", "bg-dark", "text-white", "border-success", "w-25");
        card.innerHTML = `
            <div class="card-body episode-card" data-id="${id}">
                <h5 class="card-title text-success">Episodio ${id}</h5>
                <hr>
                <p class="card-text"><strong>Nombre:</strong> ${name}</p>
                <p class="card-text"><strong>Episodio:</strong> ${episode}</p>
                <p class="card-text"><strong>Fecha de emisión:</strong>  ${air_date}</p>
            </div>
        `;

        return card;
    }

    static searchEpisodeByName(name) {
        ApiContentHandler.getData(`episode/?name=${name}`)
            .then(episodes => {
                const cards = episodes.map(episode => this.createEpisodeCard(episode));
                document.getElementById("episodes-mount").innerHTML = "";
                document.getElementById("load-elements-div").innerHTML = "";
                document.getElementById("episodes-mount").append(...cards);
            });
    }

    static episodeCardClick() {
        this.episodesMount.addEventListener("click", (event) => {
            if (event.target.classList.contains("episode-card")) {
                const episodeId = event.target.dataset.id;
                ApiContentHandler.getDataById("episode", episodeId)
                    .then(episode => {
                        this.episodesMount.style.display = "none";
                        this.createEpisodeDetails(episode);
                    });
            }
        });
    }

    static createEpisodeDetails({id, name, air_date, episode, characters}) {
        const episodeDetails = document.getElementById("episode-details");

        episodeDetails.innerHTML = `
            <div class="card bg-dark text-white border-success">
                <div class="card-body">
                    <h5 class="card-title">Episodio ${id}</h5>
                    <hr>
                    <p class="card-text"><strong>Nombre:</strong> ${name}</p>
                    <p class="card-text"><strong>Episodio:</strong> ${episode}</p>
                    <p class="card-text"><strong>Fecha de emisión:</strong>  ${air_date}</p>
                    <p class="card-text"><strong>Personajes:</strong></p>
                    <ul id="character-list" class="list-group list-group-flush">
                    ${characters.map(character => `<li class="list-group list-group-item bg-dark text-white border-success">${character}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `;
    }
}