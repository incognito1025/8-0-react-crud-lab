//import { useState } from "react"; //Add state to the `ShowsIndex` component with `useState`
import { Link } from "react-router-dom";
import ErrorMessage from "../errors/ErrorMessage";
import "./ShowsIndex.css";
// Top of file
import { getAllShows } from "../../api/fetch"; //Import and call getAllShows() on component mount. Then setShows()to the incoming data and setLoadingError() to false. If there is an error, log the error and change the loadingError to true.
import { useEffect, useState } from "react"; //import the useEfferct() function 
import ShowListing from "./ShowListing"; //Import the component to have a `ShowListing` componenet for each show.


function filterShows(search, shows) {
  return shows.filter((show) => {
    return show.title.toLowerCase().match(search.toLowerCase());
  });
}


export default function ShowsIndex() {
  // Create a state variable called `loadingErro`r` and a function called `setLoadingError` to update the state of the variable.
  // Set loadingError default to false
  // Inside functional component
const [loadingError, setLoadingError] = useState(false); //ternary - when it's false, then it will show `section className="shows-index-wrapper"`; if it's true, it will return the value of the component error message.
// src/components/show/ShowIndex
const [shows, setShows] = useState([]); // Created state to hold the shows.; This is an empty array when it was mounted

const [allShows, setAllShows] = useState([]);

const [searchTitle, setSearchTitle] = useState("");

// Call getAllShows(). getAllShows() is a function that returns a promise. When a promise is returned, you can chain a .then() function that will execute when getAllShows() has either fulfilled or rejected the promise. If the promise is fulfilled (the fetch request successfully requested data), it will return a response containing the data. Additionally, there is no loading error, so set that to false. If the promise is rejected, use .catch() to run the code that handles the error. Log the error and setLoadingError in this case to true.
useEffect(() => {
  getAllShows()   //aka `GET` request
    .then((response) => {
      setAllShows(response);
      setShows(response);  // update the shows state variable with line 16 useState. causes the useEffect function to be invoked.
      setLoadingError(false);
    })
    .catch((error) => {
      console.error(error);
      setLoadingError(true);
    });
}, []);
//The above will load the data into state, you can add in the component that will display the data

function handleTextChange(event) {
  const title = event.target.value; // Search Shows field input box
  const result = title.length ? filterShows(title, allShows) : allShows;
  setSearchTitle(title); //updating what I am seeing in the input box
  setShows(result); //the array of objects or list of shows as the result
}


  return (
    <div>
      {loadingError ? ( //if it is hardcoded to `false`, the error message will never show; replace the hard-coded false (after the opening div) inside the return to be the variable loadingError; To test that this component loads, you can change the initial state for loadingError to true. However, for a better user experience, the initial value should be false.
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Shows</h2>
          <button>
            <Link to="/shows/new">Add a new show</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search Shows:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="shows-index">
            {shows.map((show) => {
              return <ShowListing show={show} key={show.id} />; // show is in an array of objects. .map will extract that info. Each element will pass onto ShowsListing as a prop. Show-index will pass the show to ShowsListing component as a prop.
            })}
          </section>
        </section>
      )}
    </div>
  );
}
