$( document ).ready(function() {
    $(".containerBlock").hide(); // Hide the forecast container on page load
    $(".card").hide(); // Hide the city name/date on page load
});

function getUserInput(event) { // This function retrieves user input and creates a url endpoint with that info
    event.preventDefault();
    let userInput = $(".inputForm").val().trim(); // Saves the user's input and removes whitespace
    $(".inputForm").val(""); // Clears the input form 

    if (userInput) { // Checking if the user entered something
        let enc = "YmNiMDNjNDkxNWQ1OTY2MTkwYTc0YzI1OWQ2ODM0ZDg=";
        let dec = window.atob(enc);
        let cityUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=" + dec;
        appendItems(cityUrl);   // Start the appendItems function with the user input. API parameter = imperial for fahrenheit
    } else {
        alert("Please enter in a city.");  // Validation for if the user doesn't enter in anything 
    };
};

function appendItems(cityUrl) {
    let day1 = $(".day1"); // Targets day 1 card
    let day1Icon = $(".day1Icon");
    let day1Temp = $(".day1Temp");
    let day2 = $(".day2"); // Targets day 2 card
    let day2Icon = $(".day2Icon");
    let day2Temp = $(".day2Temp");
    let day3 = $(".day3"); // Targets day 3 card
    let day3Icon = $(".day3Icon");
    let day3Temp = $(".day3Temp");
    let day4 = $(".day4"); // Targets day 4 card
    let day4Icon = $(".day4Icon");
    let day4Temp = $(".day4Temp");
    let day5 = $(".day5"); // Targets day 5 card
    let day5Icon = $(".day5Icon");
    let day5Temp = $(".day5Temp");  
    fetch(cityUrl)
        .then(function(response) {
            if(response.ok) {
                return response.json(); // Return response as JSON
            } else {
                alert("Please enter a valid city name."); // If user did not enter a valid city, an alert will pop up 
                return;
            }
        })
        .then(function(data) { // Do this to the data
    

            $(".welcomeText").hide(1000); // Hide the welcome text
            $(".containerBlock").show(2000); // Show the forecast container
            $(".card").show(); // Show the city name/date
            let cityName = data.city.name; // Accesses the city's name 
            let country = data.city.country; // Accesses the country 
            let date = moment.unix(data.list[0].dt).format("MMMM Do"); // Converts to current date in city
            let temp = data.list[0].main.temp; // Temperature in fah. Can use this again for day 1 temp below.
            let humidity = data.list[0].main.humidity; // Humidity in %
            let wind = data.list[0].wind.speed; // Wind speed in m/hour
            $(".citySpan").text(`${cityName}, ${country}`); // Filling the spans with the data
            $(".dateSpan").text(date);
            $(".tempSpan").text(temp);
            $(".humiditySpan").text(humidity);
            $(".windSpan").text(wind);

            /* Goes through 0, 8, 16, 24, 32 for next day's data */ 
            let icon1 = data.list[0].weather[0].icon; // Day 1 Forecast
            let iconUrl1 = "https://openweathermap.org/img/w/" + icon1 + ".png";
            day1.text("TODAY"); // Same as the main card
            day1Icon.attr("src", iconUrl1);
            day1Temp.text(temp); // Same as the main card

            let icon2 = data.list[8].weather[0].icon; // Day 2 Forecast
            let iconUrl2 = "https://openweathermap.org/img/w/" + icon2 + ".png";
            let date2 = moment.unix(data.list[8].dt).format("dddd");
            day2.text(date2);
            day2Icon.attr("src", iconUrl2);
            let date2Temp = data.list[8].main.temp; 
            day2Temp.text(date2Temp);

            let icon3 = data.list[16].weather[0].icon; // Day 3 Forecast
            let iconUrl3 = "https://openweathermap.org/img/w/" + icon3 + ".png";
            let date3 = moment.unix(data.list[16].dt).format("dddd");
            day3.text(date3);
            day3Icon.attr("src", iconUrl3);
            let date3Temp = data.list[16].main.temp; 
            day3Temp.text(date3Temp);

            let icon4 = data.list[24].weather[0].icon; // Day 4 Forecast
            let iconUrl4 = "https://openweathermap.org/img/w/" + icon4 + ".png";
            let date4 = moment.unix(data.list[24].dt).format("dddd");
            day4.text(date4);
            day4Icon.attr("src", iconUrl4);
            let date4Temp = data.list[24].main.temp; 
            day4Temp.text(date4Temp);

            let icon5 = data.list[32].weather[0].icon; // Day 5 Forecast
            let iconUrl5 = "https://openweathermap.org/img/w/" + icon5 + ".png";
            let date5 = moment.unix(data.list[32].dt).format("dddd");
            day5.text(date5);
            day5Icon.attr("src", iconUrl5);
            let date5Temp = data.list[32].main.temp; 
            day5Temp.text(date5Temp);

            let storeObject = { // Saving the data into an object
                "cityName": cityName,
                "country": country,
                "date": date, 
                "temp": temp,
                "humidity": humidity,
                "wind": wind, 
                "iconUrl1": iconUrl1,
                "iconUrl2": iconUrl2,
                "date2": date2,
                "date2Temp": date2Temp,
                "iconUrl3": iconUrl3,
                "date3": date3,
                "date3Temp": date3Temp,
                "iconUrl4": iconUrl4,
                "date4": date4,
                "date4Temp": date4Temp,
                "iconUrl5": iconUrl5,
                "date5": date5,
                "date5Temp": date5Temp,
            }
            let items = localStorage.getItem("items");
            if (items === null) {
                items = [];
            } else {
                items = JSON.parse(items);
            }
            items.push(storeObject); // Push the object into the array
            let allItems = JSON.stringify(items);
            localStorage.setItem("items", allItems); // Save allItems into local storage    
            let button = $("<button>"); // Appends the button to the history list
            button.addClass("list-group-item");
            button.text(cityName);
            button.attr("name", cityName);
            $(".history-list").append(button);
        });            
};

function showHistoryBtn() {
    let items = localStorage.getItem("items");
    items = JSON.parse(items);

    if (items !== null) {
        let counter = items.length - 1; // This will count the actual number of items in the object

        for (let i = 0 ; i <= counter ; i++ ) {
            let button = $("<button>");
            button.addClass("list-group-item");
            button.text(items[i].cityName);
            button.attr("name", items[i].cityName);
            $(".history-list").append(button);
        }
    } else {
        console.log("Empty local storage.");
    }
} 

function showHistoryData(e) {
    e.preventDefault;
    $(".welcomeText").hide(1000); // Show the welcome text
    $(".containerBlock").show(2000); // Show the forecast container
    $(".card").show(1000); // Show the main city/date card
    let items = localStorage.getItem("items");
    items = JSON.parse(items);
    let nameOfCity = e.target.getAttribute("name");
    let obj =items.find(i => i.cityName === nameOfCity); //  Finds the array in the object that matches city name
    let day1 = $(".day1"); // Targets day 1 card
    let day1Icon = $(".day1Icon");
    let day1Temp = $(".day1Temp");
    let day2 = $(".day2"); // Targets day 2 card
    let day2Icon = $(".day2Icon");
    let day2Temp = $(".day2Temp");
    let day3 = $(".day3"); // Targets day 3 card
    let day3Icon = $(".day3Icon");
    let day3Temp = $(".day3Temp");
    let day4 = $(".day4"); // Targets day 4 card
    let day4Icon = $(".day4Icon");
    let day4Temp = $(".day4Temp");
    let day5 = $(".day5"); // Targets day 5 card
    let day5Icon = $(".day5Icon");
    let day5Temp = $(".day5Temp");
    $(".citySpan").text(obj.cityName); // Fills the screen with the data of the city clicked on 
    $(".dateSpan").text(obj.date);
    $(".tempSpan").text(obj.temp);
    $(".humiditySpan").text(obj.humidity);
    $(".windSpan").text(obj.wind);
    day1.text("TODAY");
    day1Icon.attr("src", obj.iconUrl1);
    day1Temp.text(obj.temp); 
    day2.text(obj.date2);
    day2Icon.attr("src", obj.iconUrl2);
    day2Temp.text(obj.date2Temp);
    day3.text(obj.date3);
    day3Icon.attr("src", obj.iconUrl3);
    day3Temp.text(obj.date3Temp);
    day4.text(obj.date4);
    day4Icon.attr("src", obj.iconUrl4);
    day4Temp.text(obj.date4Temp);
    day5.text(obj.date5);
    day5Icon.attr("src", obj.iconUrl5);
    day5Temp.text(obj.date5Temp);
}

$(".clear-btn-location").on("click", function() { // When the clear button is clicked, local storage + history list is cleared
    $(this).hide();
    localStorage.clear();
    $(".history-list").text("");
    window.location.reload();
})

showHistoryBtn(); // Show the recent searches on page load
$(".searchBtn").on("click", getUserInput); // When the user clicks the search, this function will execute
$(".history-list").on("click", showHistoryData) // When the user clicks the history button, show data on screen
