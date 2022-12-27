import { formHandler } from './api.js'
import { updateUI } from './ui.js';

// An object to store data that will be used to update the UI
export let uiData = {};

// Calculate the length of the trip in days and store it in the uiData object
export const getLengthOfTrip = () => {
    // Get the start and end dates from the form input fields
    const start = new Date(document.getElementById('start').value);
    const end = new Date(document.getElementById('end').value);

    // Calculate the length of the trip in days
    const length = end.getTime() - start.getTime();
    uiData.lengthOfTrip = length / (1000 * 60 * 60 * 24) + " days";
}

// Calculate the number of days remaining until the trip and store it in the uiData object
export const getRemainingDaysOfTrip = () => {
    // Get the start date from the form input field
    const start = new Date(document.getElementById('start').value);
    // Get the current time
    const time = new Date();

    // Calculate the remaining time until the trip in days
    const remainingTimeToTrip = Math.ceil(start - time);
    uiData.remainingTimeToTrip = Math.ceil(remainingTimeToTrip / (1000 * 60 * 60 * 24)) + " days";
}

// Validate the form input values and process the form if they are valid
export const processInput = async () => {
    // Get the values of the form input fields
    const destination = document.getElementById('destination').value;
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Validate the form input values
    if (start.length !== 0 && end.length !== 0 && destination.length !== 0 && (endDate - startDate >= 0)) {
        // Change the text of the form submit button to indicate that data is being fetched
        document.getElementById('form-submit').innerHTML = "Fetching data..."
        // Fetch data from the API
        await formHandler();
        // Calculate the length of the trip and the remaining time until the trip
        getRemainingDaysOfTrip();
        getLengthOfTrip();
        // Change the text of the form submit button back to its original value
        document.getElementById('form-submit').innerHTML = "Submit";
        // Update the UI with the fetched data
        updateUI();
    } else {
        // Display an error message if the form input values are invalid
        document.getElementById('status').innerHTML = "Please enter correct values";
        // Clear the error message after 5 seconds
        setTimeout(() => {
            document.getElementById('status').innerHTML = "";
        }, 5000);
    }
}
