const searchForm = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const weatherIcon = document.querySelector("#weather-icon");
const dateElement = document.querySelector("#date");
const apikey = "6396505bb3526b114b888e00c1f4132c";

searchForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    
    const city = cityInput.value.trim();
    if(city === ""){
        alert("Please Enter a city");
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
});

const displayWeather = (data) => {
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    condition.textContent = data.weather[0].description;
    pressure.textContent = data.main.pressure;
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    console.log(data);
}



