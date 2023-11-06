// Your code here
//set const, change from vars, add Div for weather
const weatherDiv = document.getElementById('weather')
const form = document.querySelector('form')
//set url and key
const URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const KEY = '&units=imperial&appid=617b7365c8bfd199658b19781e4bb788'

//begin async function
form.onsubmit = async function(e) {
    e.preventDefault() //prevent function from defaulting
    const searchTerm = this.search.value 
    if (!searchTerm) return //if empty, stop function
    form.search.value = "" //clear function

    try {
        const res = await fetch(`${URL}${searchTerm}${KEY}`) //fetch weather data
        const data = await res.json() //
        renderWeather(data) //display weather 
    } catch (error) {
        weatherDiv.innerHTML = '<p>Location not found</p>' //display error message for no location
    }
} 

// destructuring, template literals, arrow function

const renderWeather = ({ //set const
    sys: {country}, 
    name,
    coord: {lat, lon}, 
    weather: [{icon, description}], 
    main: {temp, feels_like}, 
    dt,
    day = new Date(dt * 1000), //set time const
    time = day.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit'
    }
    )
}) => { //set time const
    const timeString = new Date(dt * 1000).toLocaleTimeString('en-US', 
    { hour: 'numeric',
     minute: '2-digit' })
//display weather
weatherDiv.innerHTML = `<h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>${description}</p>
    <p>Current Temp: ${temp} °F</p>
    <p>Feels Like: ${feels_like} °F</p>
    <p>Last Updated: ${timeString}</p>`
}
//Convert a var declaration to const or let where appropriate.
//Convert a promise-based function (a function call with .then) to instead use async and await.
//Convert a function declaration into a arrow function.
//Convert string concatenation to instead use template literals and string interpolation.
//Convert some object-related code to use ES6 destructuring.