let searchedCity = "cardiff";
let apiKey = "6b1dbcd0aa844738a2df75082ac70380";
let searchedCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=metric`;

function displayTemp(response){
    console.log(response);
    let celcTemp = response.data.main.temp;
    celcTemp =  Math.round(celcTemp);
    let displayTemp = document.querySelector("#temp");
    displayTemp.innerHTML = `${celcTemp}°`;
    let cityName = document.querySelector("#place");
    cityName.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
    let weatherDescription = document.querySelector("#weatherDetails");
    weatherDescription.innerHTML = response.data.weather[0].description;
    let humidityLevel = document.querySelector("#humidity");
    humidityLevel.innerHTML = response.data.main.humidity;
    let windSpeed = document.querySelector("#wind");
    windSpeed.innerHTML = Math.round(response.data.wind.speed);

    console.log( new Date(1624040973 * 1000));
    
    
    
};
axios.get(searchedCityUrl).then(displayTemp);


