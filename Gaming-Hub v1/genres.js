const genresContainer = document.querySelector("#genres-container");
const genreGamesContainer = document.querySelector("#genre-games-container");
const searchForm = document.querySelector("#genres-search-form");
const searchInput = document.querySelector("#genres-game-input");

const genres = [
    { name: "Action", id: 4 },
    { name: "Adventure", id: 3 },
    { name: "RPG", id: 5 },
    { name: "Strategy", id: 10 },
    { name: "Shooter", id: 2 },
    { name: "Sports", id: 15 },
    { name: "Racing", id: 1 },
    { name: "Puzzle", id: 7 },
    { name: "Simulation", id: 14 },
    { name: "Fighting", id: 6 }
];

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchQuery = searchInput.value.trim();

    if (!searchQuery) {
        return;
    }

    getSearchGames(searchQuery);
});

const getSearchGames = async (searchQuery) => {
    const url = `http://127.0.0.1:5000/api/games?search=${encodeURIComponent(searchQuery)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch search results");
        }

        const data = await response.json();

        genreGamesContainer.innerHTML = "";

        data.results.forEach((game) => {
            genreGamesContainer.appendChild(createGameCard(game));
        });

    } catch (error) {
        console.log(error);
    }
};

const createGameCard = (game) =>{
    const card = document.createElement("div");

    card.classList.add("game-card");
    const genres = game.genres
    .map((genre) => genre.name)
    .join(" * ");
    
    const metacritic = game.metacritic ?? "N/A";
    const image = game.background_image || "images/placeholder.jpg";
    card.innerHTML = `
        <div class="game-image">
            <img src="${image}" alt="${game.name}">
            <span class="metacritic">${metacritic}</span>
        </div>

        <div class="game-info">
            <h3>${game.name}</h3>
            <p>⭐ ${game.rating}</p>
            <p>${genres}</p>
        </div>
    `;
    card.addEventListener("click", () => {
    window.location.href = `game.html?id=${game.id}`;
    });
    return card;
}

const getGenreGames = async(genreId) =>{
    const url = `http://127.0.0.1:5000/api/games?genres=${genreId}`;
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch genre games");
        }
        const data = await response.json();
        genreGamesContainer.innerHTML = "";
        data.results.forEach((game) =>{
            genreGamesContainer.appendChild(createGameCard(game));
        })
    }
    catch(error){
        console.log(error);
    }
};

genres.forEach((genre) =>{
    const genreCard = document.createElement("div");
    genreCard.classList.add("genre-card");

     genreCard.innerHTML = `
        <h3>${genre.name}</h3>
    `;
    genreCard.addEventListener("click",()=>{
        console.log("Selected Genre: ", genre.name);
        console.log("Genre Id: ", genre.id);
        getGenreGames(genre.id);
    });

    genresContainer.appendChild(genreCard);

});

