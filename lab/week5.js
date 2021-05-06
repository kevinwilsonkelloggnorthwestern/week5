// Goal: Implement a weather application using data from an external API
// - Signup for an api key @ https://weatherapi.com
// - The API takes three inputs (querystring parameters)
//   - key = your API key
//   - q = a location query (e.g. Chicago)
//   - days = number of days of forecast data to return, between 1-10
// - Example: https://api.weatherapi.com/v1/forecast.json?key=YOUR-API-KEY&q=Chicago&days=3
// - The basic recipe (algorithm) is included; write the rest of the recipe in the comments!
// - Lab: Follow the provided recipe and the "mock-up" provided in the hard-coded HTML; respond 
//        to the user filling out the location on the form by fetching the weather API and 
//        displaying the city/state, e.g. if the user enters "chicago" on the form, show "Current
//        Weather for Chicago, Illinois".
// - Homework: Complete the application by accepting a number of days; show the current weather 
//             conditions and forecast based on the number of days entered by the user.

window.addEventListener('DOMContentLoaded', async function() {
  // Get a reference to the "get weather" button

let weatherButton = document.querySelector(`.get-weather`)


  // When the "get weather" button is clicked:

  weatherButton.addEventListener(`click`, async function(event){
        // - Ignore the default behavior of the button
event.preventDefault()

    // - Get a reference to the element containing the user-entered location
let location = document.querySelector(`#location`)
let days = document.querySelector(`#days`)
// - Get the user-entered location from the element's value

let definedLocation = location.value
let defineddays = days.value

    // - Check to see if the user entered anything; if so:

  if(location.value.length > 0 ){
      // - Construct a URL to call the WeatherAPI.com API
      let url = `https://api.weatherapi.com/v1/forecast.json?key=7e2cf60471bb44749ae11544213004&q=${definedLocation}&days=${defineddays}`
      // - Fetch the url, wait for a response, store the response in memory
      let response = await fetch(url)
      // - Ask for the json-formatted data from the response, wait for the data, store it in memory
      let json = await response.json()
      // - Write the json-formatted data to the JavaScript console

      console.log(json)
      // - Store the interpreted location, current weather conditions, the forecast as three separate variables
let place = json.location
let currentWeather = json.current
let currentForecast = json.forecast

// create variable for current weather data section of HTML

let currentWeatherArea = document.querySelector(`.current`)
let forecastWeatherArea = document.querySelector(`.forecast`)

//insert applicable HTML into current forecast section

currentWeatherArea.insertAdjacentHTML(`beforeend`, 
`<div class="text-center space-y-2">
<div class="font-bold text-3xl">Current Weather for ${place.name}, ${place.region}</div>
<div class="font-bold">
  <img src="https:${currentWeather.condition.icon}" class="inline-block">
  <span class="temperature">${currentWeather.temp_f}</span>° 
  and
  <span class="conditions">${currentWeather.condition.text}</span>
</div>
</div>`)


// add in header div including '3 day forecast'

forecastWeatherArea.insertAdjacentHTML(`beforeend`, 
`<div class="text-center space-y-8">
<div class="font-bold text-3xl">${defineddays} Day Forecast</div>`)

// for loop that generates forecasts if user inputs 1, 2, or 3 days. if user inputs 0 days, include 1 day of forecast.
for(let i = 0; i < defineddays; i++){

  // insert forecast HTML into the forecast div using i where i is the forecast to pull from forecast.forecastday.i
  forecastWeatherArea.insertAdjacentHTML(`beforeend`, 
  `<div>
  <img src="https:${currentForecast.forecastday[i].day.condition.icon}" class="mx-auto">
  <h1 class="text-2xl text-bold text-gray-500">${currentForecast.forecastday[i].date}</h1>
  <h2 class="text-xl">High ${currentForecast.forecastday[i].day.maxtemp_f}° – Low ${currentForecast.forecastday[i].day.mintemp_f}</h2>
  <p class="text-gray-500">${currentForecast.forecastday[i].day.condition.text}</h1>
</div>`)

}




  }

  })

      // - Continue the recipe yourself!
})