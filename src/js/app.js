const apiKey = `6948fd5a50d6bf51eb00c914a734fd74`;

navigator.geolocation.getCurrentPosition(position => {
  getCurrentConditions(position.coords.latitude, position.coords.longitude);
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