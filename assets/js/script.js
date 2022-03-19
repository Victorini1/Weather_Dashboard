var searchHistory ={ city: []};
let userInput = $("#search")
const weatherApiUrl = "https://api.openweathermap.org";
const apiKey = "d57770cf834ac891e7e282fc1655e324";
const bigCard = $("#big-card-h");
const subBtn = $("#submitbutton");
const smallCard =$("#days"); 
const removeCard =$("smallcard")
const pastbutton = $("#history")
let coordinates;
let weather;

// get the api to pull results
async function geoGrab() {
 
  let geoURL = `https://api.openweathermap.org/geo/1.0/direct?q=${searches}&appid=${apiKey}`;
  
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
    await geoGrab(searches);
    console.log(searches);

 
    let queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates[0].lat}&lon=${coordinates[0].lon}&units=imperial&appid=${apiKey}`;

    await fetch(queryURL)
      .then(function(response) {
          // console.log(response.statusText);
          return response.json();
      })
      .then(function(data) {
        // console.log(data);
        weather = data;
        return weather
      });
      
      showWeatherData();
      renderCards();
      searchButtons();
}


subBtn.click(function(event){
  event.preventDefault();
  searches = userInput.val();
  console.log(searches);
  saveSearches(searches);
  getApi(searches);
});   

function saveSearches(searches){
  searchHistory.city.push(searches)
  localStorage.setItem("city", JSON.stringify(searchHistory));
}

function loadSearches(){
  if(localStorage.getItem("city")) {
    searchHistory = JSON.parse(localStorage.getItem("city"));
    // console.log(searchHistory);
    searchButtons(searchHistory);
  }
}



function searchButtons(){
  for (i = 0; i < searchHistory.city.length; i++){
    if (i > searchHistory.city.length -6){
    let btnTxt = searchHistory.city[i];
  pastbutton.append(`<button type="button" id="past" class="btn 
  btn-outline-dark btn-lg btn-block">${searchHistory.city[i]}</button>`)
  }
}};




// Readme asks for  temperature, the humidity, the wind speed, and the UV index
function showWeatherData(){
   let date = moment();
   let status = weather.daily[0].weather[0].description;
   let city = coordinates[0].name;
   let windSpeed = weather.daily[0].wind_speed;
   let temp = weather.daily[0].temp.day;
   let humidity =  weather.daily[0].humidity;
   let icon = weather.daily[0].weather[0].icon
   // Place all the info on the page, in the bigger Card for the main data
   bigCard.html(
   `<div id="bigcard" class="card">
    <div class="card-header text-center">${city}, ${date.format("MMMM Do")}</div>
    <div class="card-body"><h4 class="card-title">${status}</h4>
    <div class="card-body"><h4 class="card-title"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"></h4>
    <p class="card-text">Temperature: ${temp}°</p>
    <p class="card-text">Humidity: ${humidity}%</p>
    <p class="card-text">Windspeed: ${windSpeed} mph</p>
    </div></div>`)
};  
  // for (weekday starting at the first value, 8, go until you reach 8)
function renderCards(){
  smallCard.empty()
  weather.daily.forEach((weekday) => {
        let windSpeed = weekday.wind_speed;
        let temp = weekday.temp.day;
        let humidity =  weekday.humidity;
        let icon = weekday.weather[0].icon;
        // render the small cards like the bigger one with modified data
        smallCard.append(
          `<div id="smallcard" class="card" style="width: 18rem;">
          <div class="card-body">
          <p class="card-text"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon"></p>
          <p class="card-text">Temp: ${temp}°</p>
          <p class="card-text">Humidity: ${humidity}%</p>
          <p class="card-text">Wind Speed: ${windSpeed} mph</p>
          </div>`)
        })
};


loadSearches();


