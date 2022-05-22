//Feature 1

let now = new Date();
let h3 = document.querySelector("h3");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();
let currentDay = days[now.getDay()];
let currentMonth = months[now.getMonth()];

h3.innerHTML = `${currentDay} ${currentMonth} ${date}, ${year} ${hour}:${minutes}`;

//Search Engine

function showTemperature(response) {
  console.log(response);
  let cityName = document.querySelector("#city");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#description");
  let high = Math.round(response.data.main.temp_max);
  let highElement = document.querySelector("#highDegree");
  let low = Math.round(response.data.main.temp_min);
  let lowElement = document.querySelector("#lowDegree");
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  cityName.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}℃`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  highElement.innerHTML = `${high}℃`;
  lowElement.innerHTML = `${low}℃`;
  humidityElement.innerHTML = `${humidity} %`;
  windElement.innerHTML = `${wind} mph`;
}

function search(city) {
  let apiKey = "083fb480cb6a36ad12a576120a9c97c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#input-city");
  cityElement.innerHTML = cityInput.value;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#input-city");
  cityElement.innerHTML = cityInput.value;
  search(city);
}

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

// Search current location
function searchLocation(position) {
  let apiKey = "083fb480cb6a36ad12a576120a9c97c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function controlSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Los Angeles");
