import { uiData } from './form.js'

// Function to handle form input and retrieve data from API
export const formHandler = async () => {
  // Get city name entered in the form
  const city = document.getElementById('destination').value;
  // Send a GET request to the server to retrieve latitude and longitude of the city
  await fetch(`http://localhost:8081/getLatLang?city=${city}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(async res => {
      // Store retrieved data in uiData object
      uiData.country = res.countryName;
      uiData.city = res.name;
      uiData.population = res.population;
      // Call getWeather function to retrieve weather data
      await getWeather(`http://localhost:8081/getWeather?lat=${res.lat}&long=${res.lng}`)
    })
    .catch(err => {
      console.log(err)
    })
}

// Function to retrieve weather data using latitude and longitude
export const getWeather = async (url) => {
  // Send a GET request to the server to retrieve weather data
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(async res => {
      // Store retrieved data in uiData object
      uiData.temperature = res.data[0].temp;
      uiData.weatherDesc = res.data[0].weather.description;
      // Call getPics function to retrieve image data
      await getPics(`http://localhost:8081/getPics?q=${uiData.city}`)
    })
    .catch(err => {
      console.log(err)
    })
}

// Function to retrieve images related to the city name entered
export const getPics = async (url) => {
  // Send a GET request to the server to retrieve image data
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(res => res.json())
    .then(res => {
      // Store retrieved data in uiData object
      uiData.img = res.webformatURL;
    })
    .catch(err => {
      console.log(err)
    })
}
