let input = document.querySelector("#input");
let searchBtn = document.querySelector("#submit");
let forecastBody = document.querySelector("#forecast-body");
let citiesBody = document.querySelector("#cities");
let current = document.querySelector(".current");
let recentSearch = JSON.parse(localStorage.getItem("CitiesHistory")) || [];
let forecastArr = [];



let handelSearchBtn = function(event) {
    event.preventDefault();
    let desiredCity = input.value.trim();
    getCurrentWeather(desiredCity);
    getForeCastWeather(desiredCity);
    displayHistory();
}

let getCurrentWeather = function(city) {

    currentWeather = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=8b78199eb8f03b49540094ab06b68369';

    fetch(currentWeather).then(function(response) {
            if (!response.ok) {

                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayCurrentWeather(data);

        })
        .catch(function(error) {
            console.error(error);
        });

}

let getForeCastWeather = function(city) {
    foreCastweather = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=metric&appid=8b78199eb8f03b49540094ab06b68369';

    fetch(foreCastweather).then(function(response) {
            if (!response.ok) {

                throw response.json();
            }
            console.log(response);
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayForeCastWeather(data);

        })
        .catch(function(error) {
            console.error(error);
        });

}

let displayCurrentWeather = function(weather) {
    current.innerHTML = "";
    let weathercard = document.createElement("div");
    weathercard.classList = 'card p-1';
    let weatherDes = weather.weather[0].description;
    weathercard.innerHTML = `<div class="card-body">
    <h5 class="city-name">${weather.name},${weather.sys.country}(${moment().format("MMM Do, YYYY")}) <img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png"</h5>
    </div> <p><strong>Temprature: </strong>${weather.main.temp} ℃  (${weatherDes})</p> 
    <p><strong>Feels like: </strong>${weather.main.feels_like} ℃</p>
    <p><strong>Humidity: </strong> ${weather.main.humidity}%</p>
    <p><strong>Wind Speed: </strong> ${weather.wind.speed} km/h </p>`;

    current.appendChild(weathercard);


    recentSearch.push({
        name: weather.name,
        temp: weather.main.temp,
        description: weatherDes,
        feelsLike: weather.main.feels_like,
        humidity: weather.main.humidity,
        windspeed: weather.wind.speed
    });
    localStorage.setItem("CitiesHistory", JSON.stringify(recentSearch));
}

let displayForeCastWeather = function(forecast) {
    forecastBody.innerHTML = "";
    forecastArr = forecast.list;
    for (var i = 4; i < forecastArr.length; i = i + 8) {
        let Date = moment(forecastArr[i].dt_txt).format("MMM Do, YYYY");
        let forecastCard = document.createElement("div");
        forecastCard.classList = 'col-12 col-md-4 col-xl-3';
        let displayDayForecast = document.createElement("div");
        displayDayForecast.classList = 'card';
        displayDayForecast.setAttribute('style', 'max-width: 20rem;');
        displayDayForecast.innerHTML = `<div class="card-body">
        <h6 class="card-title">${Date}</h6>
        <p class="card-text"><strong>Temprature: </strong> ${forecastArr[i].main.temp} ℃ </p> 
        <p><strong>Feels like: </strong>${forecastArr[i].main.feels_like} ℃</p>
        <p><strong>Humidity: </strong> ${forecastArr[i].main.humidity}%</p>
        <p><strong>Wind Speed: </strong> ${forecastArr[i].wind.speed} km/h </p> </div>`;
        forecastBody.appendChild(forecastCard);
        forecastCard.appendChild(displayDayForecast);

    }

}

let displayHistory = function() {
    citiesBody.innerHTML = "";
    for (var index = 0; index < recentSearch.length; index++) {
        let historycard = document.createElement("div");
        historycard.classList = 'col-12 col-md-4 col-xl-3';
        let displaypreious = document.createElement("div");
        displaypreious.classList = 'card bg-light';
        displaypreious.setAttribute('style', 'max-width: 20rem;');
        displaypreious.innerHTML = `<div class="card-header">
        <h5 class="city-name">${recentSearch[index].name}</h5>
        </div>
    <div class="card-body" id="current-status"><p><strong>Temprature: </strong>${recentSearch[index].temp} ℃  (${recentSearch[index].description})</p>
<p><strong>Feels like: </strong>${recentSearch[index].feelsLike} ℃</p>
<p><strong>Humidity: </strong>${recentSearch[index].humidity}%</p>
<p><strong>Wind Speed: </strong>${recentSearch[index].windspeed}km/h </p></div> `
        citiesBody.appendChild(historycard);
        historycard.appendChild(displaypreious);

    }


}



searchBtn.addEventListener('click', handelSearchBtn);