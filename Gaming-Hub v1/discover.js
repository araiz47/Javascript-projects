const discoverSearchForm = document.querySelector("#discover-search-form");
const discoverGameInput = document.querySelector("#discover-game-input");
const discoverContainer = document.querySelector("#discover-container")
const params = new URLSearchParams(window.location.search);
const searchQuery = params.get("search");
console.log("Search Query: ", searchQuery);
const api_key =

discoverSearchForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    const query = discoverGameInput.value.trim();
    if(!query){
        return;
    }
    window.location.href =
        `discover.html?search=${encodeURIComponent(query)}`;
});


const createDiscoverCard = (game)=>{
    const card = document.createElement("div");
    card.classList.add("game-card");

    const genres = game.genres
    .map((genre) => genre.name)
    .join(" • ");
    
    const metacritic = game.metacritic ?? "N/A";

    card.innerHTML = `
        <div class="game-image">
            <img src="${game.background_image}" alt="${game.name}">
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
};


const discoverGames = async() =>{
const url =
    `http://127.0.0.1:5000/api/games?search=${encodeURIComponent(searchQuery)}`;
    
    try{

        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Unable to fetch search results");
        }
        const data = await response.json();
        console.log("Results:", data.results);
        console.log("Container:", discoverContainer);
        data.results.forEach((game) => {
            discoverContainer.appendChild(createDiscoverCard(game));
        });
        
    }

    catch(error){
        console.log(error);
    }
   
};

discoverGames();