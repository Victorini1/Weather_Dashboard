var searchHistory =  []; 
const weatherApiUrl = "https://api.openweathermap.org";
const apiKey = "ba5c51e4f75c57e7140f7b0966e60d54";
const bigCard = $("#big-card-h");
const subBtn = $("#submitbutton");

// get the api to pull results
function getApi() {
    var apiUrl = `${weatherApiUrl}/data/2.5/forecast?q=Dallas,Texas&cnt=5&units=imperial&appid=${apiKey}`;
        fetch(`${apiUrl}`).then(res => res.json()).then(data => {
        console.log(data)
        console.log(data.city.name)
        showWeatherData(data);
        })
    };
    //     .then(function (response) {
    //     return response.json();
    //  })
    //     .then(function (data) {
    //     showWeatherData();
        // console.log(data.list[0].weather[0].main)
    
    //  })
    
    // };
    // prevent the default and allow the button to build the layout
    // build the layout with javascript
    
    subBtn.click(function(event){
        event.preventDefault();
});    
// Readme asks for  temperature, the humidity, the wind speed, and the UV index
function showWeatherData(data){
   let i = 0;
   let city = data.city.name;
   let windSpeed = data.list[i].wind.speed
   let {temp, humidity} = data.list[i].main;
   let curWeather = data.list[i].weather[i].main
   bigCard.html(
   `<div  class="card-header">${city}</div>
    <div class="card-body"><h4 class="card-title">${curWeather}</h4>
    <p class="card-text">Temperature: ${temp}</p>
    <p class="card-text">Humidity: ${humidity}</p>
    <p class="card-text">Windspeed: ${windSpeed}</p>
    </div>`)
};


getApi();
// create the search feature


