var searchBtn= document.getElementById("searchBtn");
var searchNow= document.getElementById("search");
var APIkey = "93ef18c62bd58c8b2a8a5a62222a9004"


function getWeather() {
    var cityName = searchNow.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIkey}`).then(function(res){return res.json()}).then(function(data){
        console.log(data)
        var title=document.getElementById("forecast-title");
        title.textContent=data.name
        addCityList(cityName)
        // var card = document.createElement("div");
        // card.classList.add("card");
        // var forecast= document.getElementById("searchForecast");
        // forecast.appendChild(card)
        
        var lat= data.coord.lat
        var lon= data.coord.lon
        fiveDayForeCast(lat,lon);
    })
}


// searchBtn.addEventListener("click", getWeather)
searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    getWeather();
})

function fiveDayForeCast(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly,alerts&appid=a216fc008611e9efe1fe2bdd571d9885`)
    .then(function(res){return res.json()}).then(function(data) {
        console.log(data);  
        displayWeather(data); 
        forecast(data.daily);

    })
}

function forecast(daily) {
   
    console.log(daily[0].temp.day)
    var day1Temp= document.getElementById("day1Temp")
    day1Temp.textContent=daily[0].temp.day
    var day1Humidity= document.getElementById("day1Humidity")
    day1Humidity.textContent=daily[0].humidity
    var day2Temp= document.getElementById("day2Temp")
    day2Temp.textContent=daily[1].temp.day
    var day2Humidity= document.getElementById("day2Humidity")
    day2Humidity.textContent=daily[1].humidity
    var day3Temp= document.getElementById("day3Temp")
    day3Temp.textContent=daily[2].temp.day
    var day3Humidity= document.getElementById("day3Humidity")
    day3Humidity.textContent=daily[2].humidity
    var day4Temp= document.getElementById("day4Temp")
    day4Temp.textContent=daily[3].temp.day
    var day4Humidity= document.getElementById("day4Humidity")
    day4Humidity.textContent=daily[3].humidity
    var day5Temp= document.getElementById("day5Temp")
    day5Temp.textContent=daily[4].temp.day
    var day5Humidity= document.getElementById("day5Humidity")
    day5Humidity.textContent=daily[4].humidity


}
// window.localStorage.setItem('City List', []);

var cityList = JSON.parse(localStorage.getItem("cityList"));
if(cityList=== null) {
    cityList=[];
    localStorage.setItem("cityList", JSON.stringify(cityList))
}

function addCityList(city) {
    cityCap = city.charAt(0).toUpperCase() + city.slice(1)
    if(!cityList.includes(cityCap)) {
        cityList.unshift(cityCap);
        localStorage.setItem("cityList", JSON.stringify(cityList));

    }
   searchHistory();
}

var historyList= document.getElementById("searchHistory");

function searchHistory() {
    historyList.innerHTML="";
    for (var i=0; i<cityList.length; i++) {
        console.log(cityList[i]);
        var card = document.createElement("div");
        card.textContent= cityList[i];
        historyList.appendChild(card);
    }
}

function displayWeather(data){
    // moment.unix(daily[0]["dt"].format("MM/DD/YYYY"));
    var temperature= document.getElementById("temperature");
    temperature.textContent=data.current.temp;
    var humidity= document.getElementById("humidity");
    humidity.textContent=data.current.humidity;
    var windSpeed= document.getElementById("windSpeed");
    windSpeed.textContent=data.current.wind_speed;
    var uvIndex= document.getElementById("uvIndex");
    uvIndex.textContent=data.current.uvi;






}

// function weatherForcast() {
//     var="";
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}`)
// }