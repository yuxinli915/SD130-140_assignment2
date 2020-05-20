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
      const dataSetPerDay = 8;
      for (let x = 0; x < weathers.list.length; x = x + dataSetPerDay) {
        const date = new Date(weathers.list[x].dt_txt);
        weathersData[weathersData.length] = {
          day: new Intl.DateTimeFormat('en-US', { weekday: `long` }).format(date),
          icon: weathers.list[x + 3].weather[0].icon,
          description: weathers.list[x + 3].weather[0].description,
        };

        for (let y = x; y < x + dataSetPerDay; y++) {
          if (weathersData[weathersData.length - 1].high === undefined || weathers.list[y].main[`temp_max`] > weathersData[weathersData.length - 1].high) {
            weathersData[weathersData.length - 1].high = weathers.list[y].main[`temp_max`];
          }

          if (weathersData[weathersData.length - 1].low === undefined || weathers.list[y].main[`temp_min`] < weathersData[weathersData.length - 1].low) {
            weathersData[weathersData.length - 1].low = weathers.list[y].main[`temp_min`];
          }
        }
      }
      return weathersData;
    })
    .then(data => update5DaysConditions(data));
}

function update5DaysConditions(weathersData) {
  const forecastEle = document.querySelector(`.forecast`);
  let html = ``;

  weathersData.forEach(day => {
    html += `
      <div class="day">
        <h3>${day.day}</h3>
        <img src="http://openweathermap.org/img/wn/${day.icon}@2x.png">
        <div class="description">${day.description}</div>
        <div class="temp">
          <span class="high">${parseInt(day.high)}℃</span>/<span class="low">${parseInt(day.low)}℃</span>
        </div>
      </div>
    `;
  })

  forecastEle.innerHTML = html;
}