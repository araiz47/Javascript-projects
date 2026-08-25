const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");
const api_key = "78ba1d1d430941289871a4b3479aad21";

const getGameDetails = async() =>{
    const url =  `https://api.rawg.io/api/games/${gameId}?key=${api_key}`;
    const response = await fetch(url);
try{

        if(!response.ok){
            throw new Error("Unable to fetch game details");
        }
            const game = await response.json();
            
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
                `https://api.rawg.io/api/games/${gameId}/screenshots?key=${api_key}`;

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