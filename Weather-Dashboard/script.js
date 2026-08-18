// ==================== DOM ELEMENTS ====================

const searchForm = document.querySelector("#search-form");
const cityInput = document.querySelector("#city-input");

const cityName = document.querySelector("#city-name");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const feelsLike = document.querySelector("#feels-like");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const weatherIcon = document.querySelector("#weather-icon");
const dateElement = document.querySelector("#date");

const hourlyContainer = document.querySelector("#hourly-container");
const dailyContainer = document.querySelector("#daily-container");


// ==================== CONFIGURATION ====================

const apikey = "6396505bb3526b114b888e00c1f4132c";


// ==================== SEARCH ====================

searchForm.addEventListener("submit", (event) => { //basically just handles the search function
    event.preventDefault();

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city");
        return;
    }

    getWeather(city);
});


// ==================== CURRENT WEATHER ====================

const getWeather = async (city) => { // basically to get the data from api

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        displayWeather(data); 
        getHourlyForecast(city);

    } catch (error) {
        console.log(error);
        alert("Unable to get weather data. Please check the city name or your connection.");
    }
};


const displayWeather = (data) => { // seperate function to display data from api to avoid clutter

    cityName.textContent = data.name;

    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;

    humidity.textContent = `${data.main.humidity}%`;

    wind.textContent = `${data.wind.speed} km/h`;

    pressure.textContent = `${data.main.pressure} hPa`;

    condition.textContent = data.weather[0].description;

    const iconCode = data.weather[0].icon;

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};


// ==================== DATE & TIME ====================

const displayCurrentDate = () => { //display the current date

    const currentDate = new Date();

    const formattedDate = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric"
    });

    dateElement.textContent = formattedDate;
};


const formatTime = (timestamp) => {  //make the dates in cards look cleaner

    const date = new Date(timestamp * 1000);

    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });
};


displayCurrentDate();


// ==================== HOURLY FORECAST ====================

const getHourlyForecast = async (city) => { // its to get the forecast weather but cleaner

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to get forecast data");
        }

        const data = await response.json();

        displayHourlyForecast(data.list);
        getDailyForecast(data.list);

    } catch (error) {
        console.log(error);
    }
};


const displayHourlyForecast = (forecastList) => { //seperate display function so data stays clean

    hourlyContainer.innerHTML = "";

    for (let i = 0; i < 8; i++) {

        const forecast = forecastList[i];

        const formattedTime = formatTime(forecast.dt);

        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <p>${formattedTime}</p>

            <img 
                src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                alt="${forecast.weather[0].description}"
            >

            <h3>${Math.round(forecast.main.temp)}°C</h3>

            <p>${forecast.weather[0].description}</p>
        `;

        hourlyContainer.appendChild(card);
    }
};


// ==================== DAILY FORECAST ====================

const getDailyForecast = (forecastList) => { // to display the 5 day forecast

    dailyContainer.innerHTML = "";

    const dailyData = {};

    // Group forecasts by date
    forecastList.forEach((forecast) => {

        const date = forecast.dt_txt.split(" ")[0];

        if (!dailyData[date]) {
            dailyData[date] = [];
        }

        dailyData[date].push(forecast);
    });


    const dates = Object.keys(dailyData);
    const upcomingDates = dates.slice(1, 6);
    // Create one card for each day
    upcomingDates.forEach((date) => {

        const forecasts = dailyData[date];

        const temperatures = forecasts.map((forecast) => {
            return forecast.main.temp;
        });

        const maxTemp = Math.max(...temperatures);
        const minTemp = Math.min(...temperatures);

        const weather = forecasts[0].weather[0];

        const day = new Date(date);

        const dayName = day.toLocaleDateString("en-US", {
            weekday: "long"
        });


        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h3>${dayName}</h3>

            <img 
                src="https://openweathermap.org/img/wn/${weather.icon}@2x.png"
                alt="${weather.description}"
            >

            <p>${weather.description}</p>

            <p>High: ${Math.round(maxTemp)}°C</p>

            <p>Low: ${Math.round(minTemp)}°C</p>
        `;

        dailyContainer.appendChild(card);
    });
};