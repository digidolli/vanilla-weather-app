let searchedCity = "tokyo";
let apiKey = "6b1dbcd0aa844738a2df75082ac70380";
let searchedCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;

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

function displayTemp(response){
    console.log(response);
    let celcTemp = response.data.main.temp;
    let displayTemp = document.querySelector("#temp");
    let cityName = document.querySelector("#place");
    let weatherDescription = document.querySelector("#weatherDetails");
    let humidityLevel = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let day = document.querySelector("#day")
    celcTemp =  Math.round(celcTemp);
    displayTemp.innerHTML = `${celcTemp}°`;
    cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    weatherDescription.innerHTML = response.data.weather[0].description;
    humidityLevel.innerHTML = response.data.main.humidity;
    windSpeed.innerHTML = Math.round(response.data.wind.speed);
    day.innerHTML = formatDate(response.data.dt * 1000);
    
    
    
};
axios.get(searchedCityUrl).then(displayTemp);


