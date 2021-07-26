var cityFormEl = document.querySelector("#city-form");


var cityData = {
    "san diego" : {
        "lat" : 32.7157,
        "long" : -117.1610
    },
};

var kelvinToFarenheit = function(kelvin) {
    return parseFloat(((kelvin - 273.15) * 9/5 + 32).toFixed(2))
}


var formSubmitHandler = function() {
    var cityName = $("#city-input").val()
    event.preventDefault();
    getWeatherData(cityName)

}

var getWeatherData = function(cityName) {
    var lat = cityData[cityName.toLowerCase().trim()].lat;
    var long = cityData[cityName.toLowerCase().trim()].long;
    // var apiKey = '28b3aa213eb25ac40fd35a5d2a113e0c';
    var apiKey = '85819ae10cb28a7013ca5804a1f7fe6e';
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 
    'lat=' + lat +
    '&lon=' +long +
    '&appid=' + apiKey;

    fetch(requestUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            renderWeatherData(data);
          });
        }
        else {
          alert('Enter a valid city. /n ex: "San Diego"');
        }
      });
}

var renderWeatherData = function(weatherData) {
    for (var i = 0; i < 5; i++) {
        var city = $("#city-input").val();
        var date = moment().format("MM/DD/YYYY")
        var temp = kelvinToFarenheit(weatherData.daily[i].temp.day);
        var wind = weatherData.daily[i].wind_speed;
        var humidity = weatherData.daily[i].humidity;
        var uvIndex = weatherData.daily[i].uvi;

        $("#city-date-" + i).text(city + ' ' + date);
        $("#temp-" + i).text(temp)
        $("#wind-" + i).text(wind)
        $("#humidity-" + i).text(humidity)
        $("#uv-index-" + i).text(uvIndex)
    }
}


cityFormEl.addEventListener("submit", formSubmitHandler)