// aplication Data
const cityLocation = "Helsingborg"; //
const apiKey = "c7c70ffe100679d44d96ba6069ce2b4d"; // The apiKey for the weatherapplication

// DOM elements

const weatherLocation = document.querySelector(".location");
const weatherIcon = document.querySelector(".weatherIcons");
const weatherTemp = document.querySelector(".weatherTempValue");

// Below is the geoposition function for getting loaction information  with help from AJAX requests

function getGeoPosition() {
  let urlGeo = `http://api.openweathermap.org/geo/1.0/direct?q=${cityLocation}&limit=5&appid=${apiKey}`;
  xhr = new XMLHttpRequest();
  xhr.open("GET", urlGeo);
  xhr.responseType = "text";

  xhr.send();

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      console.log("success");
      data = JSON.parse(xhr.responseText);
      console.log(data);
      console.log(data[0]["lat"]);
      console.log(data[0]["lon"]);
      let lat = data[0]["lat"];
      let long = data[0]["lon"];

      getWeather(lat, long);
    } else {
      console.log("error" + xhr.status);
    }
  });
}

// Below is the main function for getting weather information  with help from AJAX requests
function getWeather(lat, long) {
  let urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  console.log(urlWeather);
  ajax = new XMLHttpRequest();
  ajax.open("GET", urlWeather);
  ajax.reponseType = "text";

  ajax.addEventListener(
    "load",
    () => {
      if (ajax.status === 200) {
        weatherLocation.textContent = "success";
        data = JSON.parse(ajax.responseText);
        console.log(data);
        showWeather();
      } else {
        console.log("error" + ajax.status);
      }
    },
    false
  );

  ajax.send();
}

// showWeather fuction
function showWeather() {
  // name, country, icons, temp, description,
  city = data.name;
  country = data.sys.country;
  icons = data.weather[0].icon;
  temp = Math.round(data.main.temp);
  tempDescription = data.weather[0].description;

  weatherLocation.innerHTML = `${city}, ${country}`;
  weatherTemp.innerHTML = `${temp}°C, ${tempDescription}`;
  weatherIcon.innerHTML = `<img src="img/32x32/${icons}.png" />`;
}

//-------------the function below is for the watch----//

function watch() {
  const today = new Date();
  let hour = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let day = today.getDate();
  let month = today.getMonth();
  month++;
  minutes = checkTime(minutes);
  seconds = checkTime(seconds);

  document.getElementById("timer").innerHTML = `Todays date
    ${day} 
    ${month} 
    Time ${hour}:${minutes}:${seconds}`;
  setTimeout(watch, 1000);
}

function checkTime(i) {
  // to add a zero in front of minutes and seconds
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// The function below is for the init function which loads the page//
function init() {
  console.log("connected");
  getGeoPosition();
  watch();
}

init();
