const searchForm = document.querySelector("#search-form");
const gameInput = document.querySelector("#game-input");
const trendingContainer = document.querySelector("#trending-container");
const popularContainer = document.querySelector("#popular-container");
const api_key = "78ba1d1d430941289871a4b3479aad21";

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const query = gameInput.value.trim();

    console.log("Search:", query);

    if (!query) {
        return;
    }

    window.location.href =
        `discover.html?search=${encodeURIComponent(query)}`;
});
const getGames = async() => {
    const url = `https://api.rawg.io/api/games?key=${api_key}`;

    try{
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch games");
        }

        const data = await response.json();

        displayTrendingGames(data.results);
    }
    catch(error){
        console.log(error);
    }

}; 



const createGameCard = (game) =>{

    const card = document.createElement("div");
    card.classList.add("swiper-slide","game-card");
    const genres = game.genres.map((genre) => genre.name).join(" * ");
    const metacritic = game.metacritic ?? "N/A";

    card.innerHTML = `
    <img src = "${game.background_image}" alt = "${game.name}">
    <span class="metacritic">${metacritic}</span>
    <div class="game-info">
        <h3>${game.name}</h3>
        <p>⭐ ${game.rating}</p>
        <p>${genres}</p>
    </div>
    `;
    card.addEventListener("click", ()=> {
        window.location.href = `game.html?id=${game.id}`
    });
    return card;
};

const displayTrendingGames = (games) => {

    games.forEach((game) => {
        trendingContainer.appendChild(createGameCard(game));
    });

};

const swiper = new Swiper(".trending-swiper", {
    slidesPerView: 8,
    spaceBetween: 10,

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    }
    
});


const displayPopularGames = (games) => {
    
    games.forEach((game) => {
        popularContainer.appendChild(
            createGameCard(game)
        );
    });

    const swiper = new Swiper(".popular-swiper", {
        slidesPerView: 8,
        spaceBetween: 10,

        navigation: {
            nextEl: ".popular-swiper .swiper-button-next",
            prevEl: ".popular-swiper .swiper-button-prev",
        },

        pagination: {
            el: ".popular-swiper .swiper-pagination",
            clickable: true,
        }
    });
};

const getPopularGames = async () => {

    const url =
        `https://api.rawg.io/api/games?key=${api_key}&ordering=-rating&page_size=20`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch popular games");
        }

        const data = await response.json();

        displayPopularGames(data.results);

    } catch (error) {
        console.log(error);
    }
};

getGames();
getPopularGames();