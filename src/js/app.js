const apiKey = `6948fd5a50d6bf51eb00c914a734fd74`;

navigator.geolocation.getCurrentPosition(position => {
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
  get5Days(position.coords.latitude, position.coords.longitude);
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
    .then(weather => {
      updateCurrentConditions(weather);
    })
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

function get5Days(lat, lon) {
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
        weathersData[weathersData.length] = { day: new Intl.DateTimeFormat('en-US', { weekday: `long` }).format(date) };
        weathersData[weathersData.length - 1][`icon`] = weathers.list[x + 3].weather[0].icon;
        weathersData[weathersData.length - 1][`description`] = weathers.list[x + 3].weather[0].description;
        
        for (let y = x; y < x + 5; y++) {
          
          
        }
        console.log(weathersData);
      }
      console.log(weathers.list);
    })
}