"use strict";var apiKey="6948fd5a50d6bf51eb00c914a734fd74";function getCurrentConditions(n,t){fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(n,"&lon=").concat(t,"&units=metric&appid=").concat(apiKey)).then(function(n){if(n.ok)return n.json();throw new Error("Fail to get user location.")}).then(function(n){return updateCurrentConditions(n)})}function updateCurrentConditions(n){document.querySelector(".current-conditions").innerHTML='\n    <h2>Current Conditions</h2>\n    <img src="http://openweathermap.org/img/wn/'.concat(n.weather[0].icon,'@2x.png" />\n    <div class="current">\n      <div class="temp">').concat(parseInt(n.main.temp),'℃</div>\n      <div class="condition">').concat(n.weather[0].description,"</div>\n    </div>\n  ")}function get5DaysConditions(n,t){fetch("https://api.openweathermap.org/data/2.5/forecast?lat=".concat(n,"&lon=").concat(t,"&units=metric&appid=").concat(apiKey)).then(function(n){if(n.ok)return n.json();throw new Error("Fail to get user location.")}).then(function(n){var t=[],e=n.list.filter(function(n){return new Date(n.dt_txt).getDate()!==(new Date).getDate()});e.forEach(function(n){n.weekday=new Intl.DateTimeFormat("en-US",{weekday:"long"}).format(new Date(n.dt_txt))});for(var o=0;o<5;o++)t[t.length]={day:e[0].weekday},t[t.length-1].weathers=e.filter(function(n){return n.weekday===t[t.length-1].day}),e=e.filter(function(n){return n.weekday!==t[t.length-1].day});return t}).then(function(n){return update5DaysConditions(n)})}function update5DaysConditions(n){var t=document.querySelector(".forecast"),e="";n.forEach(function(n){e+='\n      <div class="day">\n        <h3>'.concat(n.day,'</h3>\n        <img src="http://openweathermap.org/img/wn/').concat(n.icon,'@2x.png">\n        <div class="description">').concat(n.description,'</div>\n        <div class="temp">\n          <span class="high">').concat(parseInt(n.high),'℃</span>/<span class="low">').concat(parseInt(n.low),"℃</span>\n        </div>\n      </div>\n    ")}),t.innerHTML=e}navigator.geolocation.getCurrentPosition(function(n){getCurrentConditions(n.coords.latitude,n.coords.longitude),get5DaysConditions(n.coords.latitude,n.coords.longitude)});