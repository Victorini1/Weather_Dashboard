var searchHistory =  []; 
const weatherApiUrl = "https://api.openweathermap.org";
const apiKey = "d57770cf834ac891e7e282fc1655e324";
const bigCard = $("#big-card-h");
const subBtn = $("#submitbutton");
const smallCard =$("#days"); 
let coordinates;
let weather;
// get the api to pull results

async function geoGrab() {
  //  let city = getLocation;
  let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=dallas&appid=${apiKey}`;
  
  await fetch(geoURL)
  .then(function(response) {
    // console.log(response)
    return response.json();
  })
  .then(function (data) {
    // console.log(data)
    coordinates = data;
    return coordinates;
  });
  
}


async function getApi() {
    await geoGrab();
    // console.log(coordinates);

    // let {lat, lon} = [coordinates[0].lat, coordinates[0].lon];
    // console.log(coordinates[0].lat)
    // console.log(coordinates[0].lon)
    let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&units=imperial&appid=${apiKey}`;

    await fetch(queryURL)
      .then(function(response) {
          console.log(response.statusText);
          return response.json();
      })
      .then(function(data) {
        // console.log(data);
        weather = data;
        return weather
      });
      
      showWeatherData();
      renderCards();
}
    
    subBtn.click(function(event){
        event.preventDefault();
});    
// Readme asks for  temperature, the humidity, the wind speed, and the UV index
function showWeatherData(){
  console.log(weather)
  //  let date = weather
   let status = weather.daily[0].weather[0].description
   let city = coordinates[0].name;
   let windSpeed = weather.daily[0].wind_speed;
   let temp = weather.daily[0].temp.day;
   let humidity =  weather.daily[0].humidity;
   let icon = weather.daily[0].weather[0].icon
   // Place all the info on the page, in the bigger Card for the main data
   bigCard.html(
   `<div  class="card-header">${city}</div>
    <div class="card-body"><h4 class="card-title">${status}</h4>
    <div class="card-body"><h4 class="card-title"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"></h4>
    <p class="card-text">Temperature: ${temp}</p>
    <p class="card-text">Humidity: ${humidity}%</p>
    <p class="card-text">Windspeed: ${windSpeed} mph</p>
    </div>`)
};

function renderCards(){
    let i = 0;
    // for (let i = 0; i < data.list.length; i++){
      let status = weather.daily[i].weather[i].description
      let windSpeed = weather.daily[i].wind_speed;
      let temp = weather.daily[i].temp.day;
      let humidity =  weather.daily[i].humidity;
      let icon = weather.daily[i].weather[i].icon
    // render the small cards like the bigger one with modified data
    smallCard.html(
    `<div class="card">
    <div class="card-body">
      <h4 class="card-title">date goes here</h4>
      <p class="card-text"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"></p>
      <p class="card-text">Temp: ${temp}</p>
      <p class="card-text">Humidity: ${humidity}</p>
      <p class="card-text">Wind Speed: ${windSpeed}</p>
    </div>
  </div>`)};
    

geoGrab();
getApi();
// create the search feature


