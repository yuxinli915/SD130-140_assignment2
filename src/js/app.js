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
    .then(data => {
      console.log(data);
    })
}