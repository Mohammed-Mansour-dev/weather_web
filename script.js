let cityInput = document.getElementById("cityInput"),
  cityButton = document.getElementById("cityButton"),
  notification = document.getElementById("notification"),
  apiKey = "eea153b3d78f5cebb604da22e1fd535c",
  forecast5Dayes = document.getElementById("CardsFore"),
  airQualityElement = document.getElementById("airQuality"),
  sunSetElement = document.getElementById("sunSet"),
  sunRiseelement = document.getElementById("sunRise"),
  currentWeatherElement = document.getElementById("currentWeatherElement");

// hourly forecast card
let hourlyForecastCard =document.getElementById("hourlyForecastCard")

// location Btn
let locationBtn = document.getElementById("locationBtn");


// get other details elements 

let currentHumidityElement = document.getElementById("currentHumidity"),
  currentWindSpeedElement = document.getElementById("currentWindSpeed"),
  currentTemperatureElement = document.getElementById("currentTemperature"),
  visibilityElement = document.getElementById("visibility"),
  pressureElement = document.getElementById("pressure");


function getWeatherDetails(state, country, lat, lon, name) {
  let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  let air_pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let air_status = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];

  let date = new Date(),
    day = days[date.getDay()],
    month = months[date.getMonth()];

  // fetching forecast weather
  fetch(forecastUrl)
    .then((res) => res.json())
    .then((data) => {


// hourly forecast
let hourlyForecast = data.list;
hourlyForecastCard.innerHTML ="";

for(let i = 0; i <= 7; i++){
  let hrForecastDate =new Date(hourlyForecast[i].dt_txt);
  let hr =hrForecastDate.getHours();

let a ="PM";
  if(hr < 12) a ="AM"
if(hr == 0) hr = 12;
if(hr > 12) hr =hr - 12;

hourlyForecastCard.innerHTML +=`
<!-- card1 -->
<div class=" bg-secondary rounded-xl pb-5 mt-3 p-3 
 flex flex-col items-center
 ">
<p class="uppercase text-gray-400 " >${hr + " " + a}</p>
<img style="filter: drop-shadow(2px 4px 6px black);" src="https://openweathermap.org/img/wn/${hourlyForecast[i]?.weather[0]?.icon}.png"  alt="weather image">
<p class="uppercase text-gray-400 " >${(
  hourlyForecast[i]?.main?.temp - 273.15
).toFixed(2)}&deg;C/p>
</div>

`

}









      let uniqueForecastDays = [];
      let fiveDaysForecast = data.list.filter((forecast) => {
        let forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecastDays.includes(forecastDate)) {
          return uniqueForecastDays.push(forecastDate);
        }
      });
      forecast5Dayes.innerHTML = " ";
      for (let i = 0; i < fiveDaysForecast.length; i++) {
        let forecastDate = new Date(fiveDaysForecast[i].dt_txt);
        forecast5Dayes.innerHTML += `
        <div class="flex items-center justify-between py-2 ">
<img style="filter: drop-shadow(2px 4px 6px black);" src="https://openweathermap.org/img/wn/${
          fiveDaysForecast[i].weather[0].icon
        }.png"  alt="weather image">
<h1 class="text-white text-base font-semibold ">${(
          fiveDaysForecast[i].main.temp - 273.15
        ).toFixed(0)}&deg;C</h1>
<h1 class="text-gray-400 text-sm font-medium ">${forecastDate.getDate()} ${
          months[forecastDate.getMonth()]
        } </h1>
<h1 class="text-gray-400 text-sm font-medium ">${
          days[forecastDate.getDay()]
        }</h1>
</div>
        `;
      }
    })
    .catch((err) => {
      alert("Error fetching forecast  weather");
      console.log(err);
    });

  // fetching current weather
  fetch(weatherUrl)
    .then((res) => res.json())
    .then((data) => {
     
      currentWeatherElement.innerHTML = `
    
<div class="flex justify-between items-center border-b py-2 md:py-4 ">
  <!-- temprature -->
    <div class="">
        <h1 class="text-white text-sm md:text-base font-normal ">Now</h1>
        <h1 class="text-white text-3xl md:text-4xl font-semibold ">${(
          data.main.temp - 273.15
        ).toFixed(2)}&deg;C</h1>
        <h1 class="text-white text-sm md:text-base font-normal">${
          data.weather[0].description
        }</h1>
    </div>

    <!-- icon -->
<div class="mr-5" >
<img  style="filter: drop-shadow(2px 4px 6px black);" src="https://openweathermap.org/img/wn/${
        data.weather[0].icon
      }@2x.png" />
</div>


</div>
<!-- date -->
<h1 class="flex gap-0.5 text-gray-400 items-center text-sm md:text-base py-2 capitalize " ><svg width="20px"  height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10H21M7 3V5M17 3V5M6.2 21H17.8C18.9201
     21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903
      20.2843 20.782 19.908C21 19.4802 21 18.9201 21
       17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903
        5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5
         18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202
          5.21799C3.71569 5.40973 3.40973 5.71569 3.21799
           6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201
            3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569
             20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2
              21Z" stroke="#d1d5db " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg> ${day} ,${date.getDate()} ,${month} ,${date.getFullYear()} </h1>
<!-- location -->
<h1 class="flex gap-0.5 text-gray-400 text-sm md:text-base items-center pb-2
 capitalize " >
 <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#9ca3af  " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#9ca3af  " stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>${name}, ${country}</h1>


    `;

    // get sunrise and sunset time
let {sunrise ,sunset} =data.sys;

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad single-digit minutes with a leading zero
    return `${hours}:${minutes}`;
  };

  sunRiseelement.innerHTML =formatTime(sunrise);
sunSetElement.innerHTML = formatTime(sunset);

// other details
let {humidity, pressure ,feels_like} =data?.main,
visibility =data?.visibility,
    windSpeed = data?.wind?.speed;



    currentHumidityElement.innerHTML = `${humidity}%`
currentWindSpeedElement.innerHTML = `${windSpeed}m/s`
currentTemperatureElement.innerHTML = `${(feels_like - 273.15 ).toFixed(2)}&deg;C`
visibilityElement.innerHTML = `${visibility / 1000}Km`
pressureElement.innerHTML = `${pressure}hPa`

    


    })
    .catch((err) => {
      alert("Error fetching current  weather");
      console.log(err);
    });

  // fetching air_pollution weather
  fetch(air_pollutionUrl)
    .then((res) => res.json())
    .then((data) => {
      let { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = data.list[0].components;

      airQualityElement.innerHTML = `
   <!-- title & air status -->
<div class="flex justify-between py-2 ">
    <h1 class="text-gray-400 capitalize text-base " >air quality index</h1>
<p class="text-black bg-red-${data?.list[0]?.main?.aqi + 2}00 px-3 rounded-full py-1 capitalize " >${
        air_status[data?.list[0]?.main?.aqi - 1]
      }</p>
</div>
<div class="w-full flex gap-x-7 gap-y-3 flex-wrap">
<!-- windd icon -->
<div class="ml-5" >
    <svg width="60px" height="60px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.25 5.5C6.25 3.70508 7.70507 2.25 9.5 2.25C11.2949 2.25 12.75 3.70507 12.75 5.5C12.75 7.29493 11.2949 8.75 9.5 8.75H3C2.58579 8.75 2.25 8.41421 2.25 8C2.25 7.58579 2.58579 7.25 3 7.25H9.5C10.4665 7.25 11.25 6.4665 11.25 5.5C11.25 4.5335 10.4665 3.75 9.5 3.75C8.5335 3.75 7.75 4.5335 7.75 5.5V5.85714C7.75 6.27136 7.41421 6.60714 7 6.60714C6.58579 6.60714 6.25 6.27136 6.25 5.85714V5.5ZM14.25 7.5C14.25 5.15279 16.1528 3.25 18.5 3.25C20.8472 3.25 22.75 5.15279 22.75 7.5C22.75 9.84721 20.8472 11.75 18.5 11.75H2C1.58579 11.75 1.25 11.4142 1.25 11C1.25 10.5858 1.58579 10.25 2 10.25H18.5C20.0188 10.25 21.25 9.01878 21.25 7.5C21.25 5.98122 20.0188 4.75 18.5 4.75C16.9812 4.75 15.75 5.98122 15.75 7.5V8C15.75 8.41421 15.4142 8.75 15 8.75C14.5858 8.75 14.25 8.41421 14.25 8V7.5ZM3.25 14C3.25 13.5858 3.58579 13.25 4 13.25H18.5C20.8472 13.25 22.75 15.1528 22.75 17.5C22.75 19.8472 20.8472 21.75 18.5 21.75C16.1528 21.75 14.25 19.8472 14.25 17.5V17C14.25 16.5858 14.5858 16.25 15 16.25C15.4142 16.25 15.75 16.5858 15.75 17V17.5C15.75 19.0188 16.9812 20.25 18.5 20.25C20.0188 20.25 21.25 19.0188 21.25 17.5C21.25 15.9812 20.0188 14.75 18.5 14.75H4C3.58579 14.75 3.25 14.4142 3.25 14Z" fill="#fff"/>
        </svg>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >co</p>
<p class="text-white text-3xl font-medium " >${co}</p>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >nh3</p>
<p class="text-white text-3xl font-medium " >${nh3}</p>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >no</p>
<p class="text-white text-3xl font-medium " >${no}</p>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >no2</p>
<p class="text-white text-3xl font-medium " >${no2}</p>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >o3</p>
<p class="text-white text-3xl font-medium " >${o3}</p>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >pm2_5</p>
<p class="text-white text-3xl font-medium " >${pm2_5}</p>
</div>

<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >pm10</p>
<p class="text-white text-3xl font-medium " >${pm10}</p>
</div>


<!-- 1 -->
<div class="text-center">
<p class="text-gray-400 uppercase font-medium " >so2</p>
<p class="text-white text-3xl font-medium " >${so2}</p>
</div>







</div>



`;

    })
    .catch(() => {
      alert("Error fetching air_pollution  ");
    });
}

// get city coordinates
function getCityCoordinates() {
  let city = cityInput.value.trim();

  if (city === "") {
    // Show the custom animated notification
    notification.classList.add("show");
  } else {
    // Hide the notification
    notification.classList.remove("show");

    // Continue with the rest of your code to get coordinates

    apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city},&limit=1&appid=${apiKey}`;

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        let { name, lat, state, lon, country } = data[0];
        getWeatherDetails(state, country, lat, lon, name);
      })
      .catch(() => {
        alert("Faild to fetch coordinates of " + city);
      });

    // end of else
  }
  // end of function
}

// Remove the notification after a delay
function hideNotification() {
  notification.classList.remove("show");
}




function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
      
let editedApiUrl =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`

fetch(editedApiUrl).then(response =>response.json()).then(data => {


let name = data?.name,
{lat , lon} =data?.coord,
country = data?.sys?.country

getWeatherDetails(null, country, lat, lon, name)

}).catch(err => {
  alert("Failed to fetch weather details for your current location")
});


    },err => {
      console.log(err)
if(err.code === err.PERMISSION_DENIED ){
  // alert("User denied the location permission")
}
    })
}



cityButton.addEventListener("click", getCityCoordinates);
cityInput.addEventListener("input", hideNotification); // Hide as the user types
notification.addEventListener("click", hideNotification);
locationBtn.addEventListener("click",getUserCoordinates);

window.onload = getUserCoordinates ;