import React, {  useEffect, useState, } from 'react';// Import the React module to use React functionalities
import './App.css';//Import css stylesheet
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component

//App function component
export default function App() {//Export default function component
  //========== State variables=====================
   const [error, setError] = useState(null);// State for error handling
  const [term, setTerm] = useState('');// State for the term input
  const [type, setType] = useState(mediaTypes[0].value);// State for the type input
  const [data, setData] = useState([]);// State to store fetched data
  const [isLoaded, setIsLoaded] = useState(false);// State to track loading status

    //=============== FETCH API DATA ============
  // Fetch initial data from the server when the component mounts
  useEffect(() => {
    async function fetchData() {//Define the asynchronous function to fetch data
      try {
        const response = await fetch('http://localhost:3001/api/submit-form');// Fetch request to the specified endpoint
        // Conditional rendering to check the 'ok' property of the 'response' object is false.
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setTerm(jsonData[0].term);
        setIsLoaded(true);
      } 
        
        catch (error) {// Result if an error occurs during the fetch
        console.error('Error fetching data:', error);
        setError('Failed to load the data');
        setIsLoaded(true);
      }
    }
    fetchData();//Call the fetchdata function
  }, []);// Empty dependency array means this effect runs only once after the initial render

  //=============REQUEST FUNCTIONS====================
//----------------DEFAULT GET REQUEST-------------------------------
  // Handle the search form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${term}+&entity=${type}`);//Api URL

      // Conditional rendering to check the 'ok' property of the 'response' is false.
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const searchData = await response.json();
      setData(searchData.results);
      setError(null); // Clear the error on successful fetch
      console.log(searchData);
    } 
      //Handle errors 
      catch (error) {// Result if an error occurs during the fetch
      console.error('Error fetching data:', error.message);
      setError('Failed to load data');
    }
  };

  //-----------------POST REQUEST-----------------------
  // Function to add new item to the list
  const handleAddItem = async () => {//Define asynchronous function
    try {
      const newItem = {//new Item to be added
        artistName: '',
        trackId: '',
        kind: '',
        trackName: '',
      };
      const response = await fetch('http://localhost:3001/api/add-item', {
        method: 'POST',//Request method
        headers: {
          'Content-Type': 'application/json',//Type of content being passed
        },
        body: JSON.stringify({//Convert the JavaScript object{ term, type, newItem} into a JSON string.
          // The string is the data sent to the request body
          // term, type, and newItem are variables that contain data to be sent to the server.
          term: term, //Url query parameter 
          type: type, //URL query parameter
          newItem: newItem, //newItem is an object representing the new item to be added. 
        }),
      });

      // Conditional rendering to check the 'ok' property of the 'response' object is false.
      if (!response.ok) {
        throw new Error('Failed to add new item');
      }
        const addedItem = await response.json();
      setData((prevData) => [...prevData, addedItem]); //Add a new item to the existing data
      //prevData is a parameter representing the previous state. The name prevData suggests that it's an array of data.
      //The spread operator (...) is used to include all the elements of prevData in the new array.
    } catch (error) {
      console.error('Error adding item:', error.message);
    }
  };
   //===============MEDIA TYPES===================
  // Media types for the dropdown
  const mediaTypes = [
    { name: 'MUSIC', value: 'music' },
    { name: 'MUSIC VIDEO', value: 'musicVideo' },
    { name: 'APPS', value: 'software' },
    { name: 'EBOOK', value: 'ebook' },
    { name: 'AUDIO BOOK', value: 'audiobook' },
    { name: 'PODCAST', value: 'podcast' },
    { name: 'MOVIES', value: 'movie' },
    { name: 'TV SHOW', value: 'tvShow' },
    { name: 'SHORT FILM', value: 'shortFilm' },
  ];

  //===================JSX RENDERING===============
  
  return (
    <>
      {/* Header */}
      <div id="appBody">
        <header id='header'>
          <h1 className='h1'>ITUNES API</h1>
        </header>
        {/* Section1 */}
        <section id='section1'>
          {/* Form for user input */}
          <form id="form" onSubmit={handleSearch}>
            {/* Input field for 'term' */}
            <label className='label'>NAME</label>
            <input
              type="text"
              placeholder="name"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />

            {/* Dropdown for 'type' */}
            <label className='label'>MEDIA TYPE</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {mediaTypes.map((mediaType) => (
                <option key={mediaType.value} value={mediaType.value}>
                  {mediaType.name}
                </option>
              ))}
            </select>

            {/* Submit button */}
            <Button type="submit" variant="primary" id='searchBtn'>
              SEARCH
            </Button>
          </form>
        </section>
        {/* Section 2 */}
        <section id='section2'>
          {/* Display search results or loading/error message */}
          {error ? (
            <div className="errorMessage">{error}</div>
          ) : !isLoaded ? (
            <p>Loading...</p>
          ) : data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.trackId}>{item.trackName}</li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </section>
      </div>
    </>
  );
}
