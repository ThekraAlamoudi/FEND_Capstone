import { uiData } from './form.js'

// Update the UI with data stored in the uiData object
export const updateUI = () => {
  // Set the destination name in the UI
  document.getElementById('destination-name').innerHTML = `${uiData.city}, ${uiData.country}`;
  // Set the trip length in the UI
  document.getElementById('trip-length').innerHTML = uiData.lengthOfTrip;
  // Set the number of days remaining until the trip in the UI
  document.getElementById('trip-remaining').innerHTML = uiData.remainingTimeToTrip;
  // Set the temperature in the UI
  document.getElementById('trip-temp').innerHTML = uiData.temperature;
  // Set the weather description in the UI
  document.getElementById('trip-weather').innerHTML = uiData.weatherDesc;
  // Set the image in the UI
  document.getElementById('trip-img').src = uiData.img;
}
