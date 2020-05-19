const apiKey = `6948fd5a50d6bf51eb00c914a734fd74`

const getLocation = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    position => { resolve(position.coords) },
    error => { reject(error) }
  );
}).then(coordinates => {
  getCurrentConditions(coordinates.latitude, coordinates.longitude);
}).catch(error => console.log(`Fail to locate!`));



// fetch(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${apiKey}`)
//   .then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       throw new Error(`Fail to retrieve data.`);
//     }
//   })
//   .then(data => {
//     console.log(data);
//   })