const apiKey = `6948fd5a50d6bf51eb00c914a734fd74`;

navigator.geolocation.getCurrentPosition(position => {
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
  get5DaysConditions(position.coords.latitude, position.coords.longitude);
});

function getCurrentConditions(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fail to get user location.`);
      }
    })
    .then(weather => updateCurrentConditions(weather));
}

function updateCurrentConditions(weather) {
  const currentConditionEle = document.querySelector(`.current-conditions`);

  currentConditionEle.innerHTML = `
    <h2>Current Conditions</h2>
    <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" />
    <div class="current">
      <div class="temp">${parseInt(weather.main.temp)}℃</div>
      <div class="condition">${weather.weather[0].description}</div>
    </div>
  `;
}

function get5DaysConditions(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fail to get user location.`);
      }
    })
    .then(weathers => {
      const weathersData = [];
      let forecast = weathers.list.filter(timeSlot => new Date(timeSlot.dt_txt).getDate() !== new Date().getDate());
      forecast.forEach(timeSlot => {
        timeSlot.weekday = new Intl.DateTimeFormat('en-US', { weekday: `long` }).format(new Date(timeSlot.dt_txt));
      });

      for (let x = 0; x < 5; x++) {
        weathersData[weathersData.length] = { day: forecast[0].weekday }
        weathersData[weathersData.length - 1].weathers = forecast.filter(timeSlot => timeSlot.weekday === weathersData[weathersData.length - 1].day);
        forecast = forecast.filter(timeSlot => timeSlot.weekday !== weathersData[weathersData.length - 1].day);
      }
      return weathersData;
    })
    .then(data => {
      getHighAndLow(data);
      update5DaysConditions(data);
    })

  function getHighAndLow(weathersData) {
    weathersData.forEach(day => {
      day.weathers.forEach(timeSlot => {
        if (day.high === undefined || timeSlot.main[`temp_max`] > day.high) {
          day.high = timeSlot.main[`temp_max`];
        }

        if (day.low === undefined || timeSlot.main[`temp_min`] < day.low) {
          day.low = timeSlot.main[`temp_min`];
        }
      })
    })
  }
}

function update5DaysConditions(weathersData) {
  const forecastEle = document.querySelector(`.forecast`);
  let html = ``;

  weathersData.forEach(day => {
    html += `
      <div class="day">
        <h3>${day.day}</h3>
        <img src="http://openweathermap.org/img/wn/${day.weathers[3].weather[0].icon}@2x.png">
        <div class="description">${day.weathers[3].weather[0].description}</div>
        <div class="temp">
          <span class="high">${Math.round(day.high)}℃</span>/<span class="low">${Math.round(day.low)}℃</span>
        </div>
      </div>
    `;
  })

  forecastEle.innerHTML = html;
}