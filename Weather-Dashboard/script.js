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
const hourlyContainer = document.querySelector("#hourly-container");
const dailyContainer = document.querySelector("#daily-container")
const apikey = "6396505bb3526b114b888e00c1f4132c";

searchForm.addEventListener("submit", async(event) => {
    event.preventDefault();
    
    const city = cityInput.value.trim();
    if(city === ""){
        alert("Please Enter a city");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

   
    try{
        const response = await fetch(url);
       
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data = await response.json();
        displayWeather(data);

    }catch(error){
       console.log(error);
       alert("Unable to get weather data. Please check the city name or your connection."); 
    } 
    getHourlyForecast(city);
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
    
}

const currentDate = new Date();
const fotmattedDate = currentDate.toLocaleDateString("en-US",{
    weekday: "long",
    month: "long",
    day: "numeric"
});
dateElement.textContent = fotmattedDate;

const getHourlyForecast = async(city) => {
try{
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
    const response2 = await fetch(url2);
    const data2 = await response2.json();

    getDailyForecast(data2.list);

    

    const forecast = data2.list[0];
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    for(let i = 0; i < 8; i++){
        const forecast = data2.list[i];

        const time = new Date(forecast.dt * 1000);

        const formattedTime = time.toLocaleTimeString("en-US",{
            hour: "numeric",
            minute: "2-digit"
        });

        const card = document.createElement("div");
        card.classList.add("forecast-card");
       card.innerHTML = `
       <p>${formattedTime}</p>
        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
        <h3>${Math.round(forecast.main.temp)}°C</h3>
        <p>${forecast.weather[0].description}</p>`;
        hourlyContainer.appendChild(card);

    }
    }catch (error){
        console.log(error);
    }
    

};

const getDailyForecast = (forecastList) =>{
    dailyContainer.innerHTML = "";
    const dailyData = {};

    forecastList.forEach((forecast) =>{
  
        const date = forecast.dt_txt.split(" ")[0];
        if(!dailyData[date]){
            dailyData[date] = [];
        }
        dailyData[date].push(forecast);
        
        
    });
    const dates = Object.keys(dailyData);
    dates.forEach((date)=>{
            const forecasts = dailyData[date];
            const temperatures = forecasts.map((forecast) => {
                return forecast.main.temp;
            });

            const maxTemp = Math.max(...temperatures);
            const minTemp = Math.min(...temperatures);
            
            const weather = forecasts[0].weather[0];
            const day = new Date(date);
            const dayName = day.toLocaleDateString("en-US",{
                weekday: "long"
            });

            const card = document.createElement("div");
            card.classList.add(("forecast-card"));

            card.innerHTML = `
            <h3>${dayName}</h3>
            <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">
            <p>${weather.description}</p>
            <p>High: ${Math.round(maxTemp)}°C</p>
            <p>Low: ${Math.round(minTemp)}°C</p>`;

            dailyContainer.appendChild(card);
        });
   
};