var cityFormEl = document.querySelector("#city-form");

var cityData = {
    "san diego" : {
        "lat" : 32.7157,
        "long" : -117.1610
    },
    "austin" : {
        "lat" : 30.2671,
        "long" : -97.7430
    },
    "chicago" : {
        "lat" : 41.8781,
        "long" : -87.6297
    },
    "new york" : {
        "lat" : 40.7127,
        "long" : -74.0059
    },
    "orlando" : {
        "lat" : 28.5383,
        "long" : -81.3792
    },
    "san fransisco" : {
        "lat" : 37.7749,
        "long" : -122.4194
    },
    "seattle" : {
        "lat" : 47.6062,
        "long" : -122.3320
    },
    "denver" : {
        "lat" : 39.7392,
        "long" : -104.9902
    },
    "atlanta" : {
        "lat" : 33.7489,
        "long" : -84.3879
    },
};

var kelvinToFarenheit = function(kelvin) {
    return parseFloat(((kelvin - 273.15) * 9/5 + 32).toFixed(2))
}

var clearWeatherValues = function() {
    for (var i = 0; i < 6; i++) {
        $("#city-date-" + i).text('');
        $("#temp-" + i).text('')
        $("#wind-" + i).text('')
        $("#humidity-" + i).text('')
        $("#uv-index-" + i).text('')
    }
};

var formSubmitHandler = function() {
    var cityName = $("#city-input").val()
    event.preventDefault();
    getWeatherData(cityName)
}

var getWeatherData = function(cityName) {
    var lat = cityData[cityName.toLowerCase().trim()].lat;
    var long = cityData[cityName.toLowerCase().trim()].long;
    var apiKey = '28b3aa213eb25ac40fd35a5d2a113e0c';
    var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?' + 
    'lat=' + lat +
    '&lon=' +long +
    '&appid=' + apiKey;

    fetch(requestUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            renderWeatherData(data, cityName);
          });
        }
        else {
          alert('Enter a valid city. /n ex: "San Diego"');
        }
      });
}

var renderWeatherData = function(weatherData, cityName) {
    for (var i = 0; i < 6; i++) {
        var city = cityName;
        var date = moment().add(i,'days').format("MM/DD/YYYY")
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

clearWeatherValues();
cityFormEl.addEventListener("submit", formSubmitHandler)

$("#austin").on("click", function() {
    getWeatherData($(this).text())
})
$("#chicago").on("click", function() {
    getWeatherData($(this).text())
})
$("#new-york").on("click", function() {
    getWeatherData($(this).text())
})
$("#orlando").on("click", function() {
    getWeatherData($(this).text())
})
$("#san-fransisco").on("click", function() {
    getWeatherData($(this).text())
})
$("#seattle").on("click", function() {
    getWeatherData($(this).text())
})
$("#denver").on("click", function() {
    getWeatherData($(this).text())
})
$("#atlanta").on("click", function() {
    getWeatherData($(this).text())
})