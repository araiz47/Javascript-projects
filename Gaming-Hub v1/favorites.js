const favoritesContainer = document.querySelector("#favorites-container");
const emptyMessage = document.querySelector("#empty-message");
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

if(favorites.length === 0){
    emptyMessage.style.display = "block"; 
}
else{
    emptyMessage.style.display = "none";

    favorites.forEach((game) =>{
        favoritesContainer.appendChild(createGameCard(game));
    });
}