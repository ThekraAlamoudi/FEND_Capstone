// Find an element in the DOM by its ID
export const findElementById = (id) => {
    return document.getElementById(id);
  }
  
  // Add an event listener to an element in the DOM
  export const addEventListener = (element, event, callback) => {
    element.addEventListener(event, callback);
  }
  