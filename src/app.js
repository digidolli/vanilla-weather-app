
function formatDate(timestamp){
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10){ hours = ` 0${hours}`}
    let minutes = date.getMinutes();
    if (minutes < 10){minutes = `0${minutes}`};
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day = day[date.getDay()];
    return `${day}, ${hours}:${minutes}`
}
function formatUpcomingDays (timestamp){
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun",]
    return days[day];
}

function displayUpcomingForecast(response){
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#upcomingForecast");
    
    let forecastHTML = ``;
    forecast.forEach (function(forecastDay, index){
        if (index < 5){
        forecastHTML =
            forecastHTML +
            `
            <div class="col-2  individualDay">
                <div class="upcomingDay ">
                    ${formatUpcomingDays (forecastDay.dt)}
                </div>
                <img src=http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png alt="cloud" class="upcomingIcon">
                <div class="upcomingTemp">
                    <span class="highTemp">
                        ${Math.round(forecastDay.temp.max)}°
                    </span>
                    <span class="lowTemp">
                        ${Math.round(forecastDay.temp.min)}°
                    </span>
                </div>
            </div>
        `;
    }});
    
    forecastHTML = forecastHTML + ``;
    forecastElement.innerHTML = forecastHTML;
};
function getForecast(coordinates){
    let apiKey = `062486c738ff2a87f41c5ed11f128c97`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
    axios.get(apiUrl).then(displayUpcomingForecast);
};
function displayTemp(response){
    let celcTemp = response.data.main.temp;
    let displayTemp = document.querySelector("#temp");
    let cityName = document.querySelector("#place");
    let weatherDescription = document.querySelector("#weatherDetails");
    let humidityLevel = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let day = document.querySelector("#day")
    let weatherIcon = document.querySelector("#icon");
    let iconId = response.data.weather[0].icon;
    celsiusTemperature = Math.round(response.data.main.temp);
    celcTemp =  Math.round(celcTemp);
    displayTemp.innerHTML = `${celcTemp}°C`;
    cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    weatherDescription.innerHTML = response.data.weather[0].description;
    humidityLevel.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    day.innerHTML = formatDate(response.data.dt * 1000);
    weatherIcon.setAttribute ("src", `http://openweathermap.org/img/wn/${iconId}@2x.png`);
    weatherIcon.setAttribute("alt", response.data.weather[0].description);
    getForecast(response.data.coord);
};


function search(city){
    let apiKey = "062486c738ff2a87f41c5ed11f128c97";
    let searchedCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(searchedCityUrl).then(displayTemp);
}

function handleSubmit (event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-search");
    search(cityInput.value);
    
}


celsiusTemperature = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

search("London");
