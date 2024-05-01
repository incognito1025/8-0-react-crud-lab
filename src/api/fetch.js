// Shows
const URL = process.env.REACT_APP_API_BASE_URL; //This will get the value of the base URL from the `.env` file. Currently, the fetch request are going to a locally running API version. However, if you want to put this app on the internet, the URL needs to be updated. Using environmental variables lets you manage how applications will run in different environments.
// Create
// src/api/fetch.js
// Create
export function createShow(show) {
  const options = {
    method: "POST",
    body: JSON.stringify(show),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${URL}/shows/`, options).then((response) => {
    return response.json();
  });
}

// Delete
export function destroyShow(id) {
  const options = { method: "DELETE" };  //options variable is assigned the value of the object method
  return fetch(`${URL}/shows/${id}`, options);  
}

// Index/Get all
export function getAllShows() {
  return fetch(`${URL}/shows`).then((response) => response.json()); //Add this fetch request inside the getAllShows() function. This is creating a promise to extract data from the json file.
}

// Show/Get one
export function getOneShow(id) {
  return fetch(`${URL}/shows/${id}`).then((response) => response.json()); //fetching data 
}

// Update
// src/api/fetch.js
// Update
export function updateShow(id, show) {
  const options = {
    method: "PUT",
    body: JSON.stringify(show),
    headers: { "Content-Type": "application/json" },
  };
  return fetch(`${URL}/shows/${id}`, options).then((response) => {
    return response.json();
  });
}

// Movies

export function getAllMovies() {
  return;
}
