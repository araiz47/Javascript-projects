const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");
const favoriteBtn = document.querySelector("#favorite-btn");


const getGameDetails = async() =>{
    const url = `http://127.0.0.1:5000/api/games/${gameId}`;
    const response = await fetch(url);
try{

        if(!response.ok){
            throw new Error("Unable to fetch game details");
        }
            const game = await response.json();
            let favorites =
            JSON.parse(localStorage.getItem("favorites")) || [];

        const updateFavoriteButton = () => {

            const alreadyFavorite = favorites.some(
                (favorite) => favorite.id === game.id
            );

            if (alreadyFavorite) {
                favoriteBtn.textContent = "💔 Remove from Favorites";
            } else {
                favoriteBtn.textContent = "❤ Add to Favorites";
            }
        };

        updateFavoriteButton();

        favoriteBtn.addEventListener("click", () => {

            const alreadyFavorite = favorites.some(
                (favorite) => favorite.id === game.id
            );

            if (alreadyFavorite) {

                favorites = favorites.filter(
                    (favorite) => favorite.id !== game.id
                );

            } else {

                favorites.push(game);

            }

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            updateFavoriteButton();
        });
            
            document.body.style.setProperty(
                "--game-background",
                `url("${game.background_image}")`
            );

            document.querySelector("#game-title").textContent = game.name;

            document.querySelector("#game-rating").textContent =
                `⭐ ${game.rating}`;

            document.querySelector("#game-metacritic").textContent =
                `Metacritic: ${game.metacritic ?? "N/A"}`;

            document.querySelector("#game-release").textContent =
                `Released: ${game.released ?? "N/A"}`;

            const genres = game.genres
            .map((genre) => genre.name)
            .join(" • ");

             document.querySelector("#game-genres").textContent =
            `Genres: ${genres}`;

            document.querySelector("#game-description").innerHTML =
            game.description;

            const image = document.createElement("img");
            image.src = game.background_image;
            image.alt = game.name;
            document
            .querySelector("#game-details-image")
            .appendChild(image);

            const screenshotUrl =
                `http://127.0.0.1:5000/api/games/${gameId}/screenshots`;

            const screenshotResponse = await fetch(screenshotUrl);

            if (!screenshotResponse.ok) {
                throw new Error("Unable to fetch screenshots");
            }

            const screenshotData = await screenshotResponse.json();
            const screenshotsContainer =
            document.querySelector("#screenshots-container");

            screenshotData.results.forEach((screenshot) => {

                const img = document.createElement("img");

                img.src = screenshot.image;
                img.alt = `${game.name} screenshot`;

                screenshotsContainer.appendChild(img);
            });
        }
        catch(error){
            console.log(error);
    }
};

getGameDetails();