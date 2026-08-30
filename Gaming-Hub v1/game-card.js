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