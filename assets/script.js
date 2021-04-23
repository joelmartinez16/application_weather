var searchBtn= document.getElementById("searchBtn");
var searchNow= document.getElementById("search");
var APIkey = "93ef18c62bd58c8b2a8a5a62222a9004"


function getWeather() {
    var cityName = searchNow.value
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`).then(function(res){return res.json()}).then(function(data){
        console.log(data)
        var title=document.getElementById("forecast-title");
        title.textContent=data.name
        event.preventDefault()
        // var card = document.createElement("div");
        // card.classList.add("card");
        // var forecast= document.getElementById("searchForecast");
        // forecast.appendChild(card)
    })
}

searchBtn.addEventListener("click", getWeather)

// function weatherForcast() {
//     var="";
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${APIkey}`)
// }