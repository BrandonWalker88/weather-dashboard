var currentDiv = $("#current");
var forecastDiv = $("#forecast");

$("#search").on("click", function (e) {
  var cityName = $("#cityName").val();
  var apiKey = "95ae9859ad872c7b453330fba02c0900";
  if (cityName) {
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (res) {
      console.log(res);

      var lat = res.coord.lat;
      var lon = res.coord.lon;

      var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      $.get(oneCallUrl).then(function (response) {
        console.log(response);
        var currentDate = moment.unix(response.current.dt).format("MM/DD/YYYY");
        var currentIcon = response.current.weather[0].icon;
        var iconUrl = "http://openweathermap.org/img/w/" + currentIcon + ".png";
        var currentHtml = `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${cityName}: ${currentDate} <img src=${iconUrl}></h5>
          <p class="card-text">Temp: ${response.current.temp}</p>
          <p class="card-text">Humidity: ${response.current.humidity}</p>
          <p class="card-text">Wind Speed: ${response.current.wind_speed}</p>
          <p class="card-text">UV Index: ${response.current.uvi}</p>
        </div>
      </div>`;

        currentDiv.append(currentHtml);

        //loop through response.daily 1-5 for rest of forecast
        for (var i = 0; i < 5; i++) {
          var dailyDate = moment
            .unix(response.daily[i].dt)
            .format("MM/DD/YYYY");
          var dailyIcon = response.daily[i].weather[0].icon;
          var dailyUrl =
            "http://openweathermap.org/img/w/" + dailyIcon + ".png";
          var forecastHtml = `<div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title">${dailyDate} <img src=${dailyUrl}></h5>
              <p class="card-text">Temp: ${response.daily[i].temp.day}</p>
              <p class="card-text">Humidity: ${response.daily[i].humidity}</p>

            </div>
          </div>`;
          forecastDiv.append(forecastHtml);
        }
      });
    });
  }
});
