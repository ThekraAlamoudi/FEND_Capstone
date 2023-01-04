// Import SCSS stylesheets
import './styles/style.scss'
import './styles/media.scss'
// Import JavaScript modules
import { processInput } from './js/form.js';
import { formHandler, getWeather, getPics } from './js/api.js';
import { updateUI } from './js/ui.js';
import { findElementById, addEventListener } from './js/dom.js';

// Get the form submit button from the DOM
const formSubmitButton = findElementById('form-submit');

// Add a click event listener to the form submit button
addEventListener(formSubmitButton, 'click', processInput);

// Export functions for use in other modules
export { processInput, formHandler, getWeather, getPics, updateUI, findElementById, addEventListener }