import React, { useState, useEffect } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS stylesheet
import Form from './components/Form';//Import Form function component

//App function component
export default function App() {//Export default App function component
  //===========STATE VARIABLES============================
  const [error, setError] = useState(null);// State used to store error information
  const [isLoaded, setIsLoaded] = useState(false);//State used to track whether data is loaded
  const [term, setTerm] = useState('');// State for the term input
  const [type, setType] = useState('');// State for the type input
  const [data, setData] = useState([]);// State to store fetched data

  //===================FETCH JSON DATA=====================
  // Fetch API data on component mount
  useEffect(() => {
    async function fetchData() {//Define asynchronous function to fetch data
      try {
        const response = await fetch('http://localhost:3001/submit-form');//Make a GET request Fetch data to the specified endpoint

        //Conditional rendering to check the 'ok' property of the response object
        if (!response.ok) {
          throw new Error();//Throw an error message if the request is unsuccessful
        }
        const jsonData = await response.json();
        setTerm(jsonData[0].term);// Set the value of the term state to the first object ([0]) of the jsonData array.
        setIsLoaded(true);//Update the loading status to true
      } catch (error) {
        // Handle errors that may occur during the fetch operation
        console.error('Error fetching data:', error);//Display error message in the console
        setError('Failed to load the data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    fetchData();
  }, []);// Empty dependency array means this effect runs only once after the initial render

  //============================FUNCTIONS TO HANDLE REQUESTS=============================== 
  //=========================FUNCTION TO SEARCH FOR API DATA==============================

  const handleSearch = async (event) => {//Define asynchronous function 
    event.preventDefault();
    try {
      // Fetch data from the iTunes API based on 'term' and 'type'
      const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=${type}`);

      // Conditional rendering to check the 'ok' property of the 'response' object 
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);//Throw an error message if the response is unsuccessful
      }

      const searchData = await response.json();
      setData(searchData.results);
      console.log(searchData);;//Display search results in the console
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setError('Failed to fetch search results');
    }
  };
  //------------------POST REQUEST--------------------------------
  //Function to add new item
  const handleAddItem = async () => {//Define the asnychronous function to add a new item
    try {
      const newItem = {
        artistName: '',
        trackId: '',
        kind: '',
        trackName: '',
      };

      const response = await fetch('http://localhost:3001/api/add-item', {//Request API URL
        method: 'POST',//Request type
        headers: {
          'Content-Type': 'application/json',//Type of data being passed
        },
        body: JSON.stringify({
          term: term,
          type: type,
        }),
      });

      // Conditional rendering to check the 'ok' property of the 'response' object is false.
      if (!response.ok) {
        throw new Error('Failed to add new item');//Throw an error message if the POST requwst is unsuccussful
      }

      setData((prevData) => [...prevData, newItem]);
    } catch (error) {
      // Handle errors that may occur during the fetch operation
      console.error('Error adding item:', error.message);
      setError('Failed to add new item');
    }
  };

  //--------------------------DELETE REQUEST-----------------------------
  //Function to delete an item
  const deleteItem = async (trackId) => {//Define asynchronous function to delete an item 
    try {
      const response = await fetch(`http://localhost:3001/api/${trackId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-Type': 'application/json',//Type of content being passed
        },
      });

      // Check if the DELETE request is successful; otherwise, throw an error
      if (!response.ok) {
        throw new Error('Failed to delete item');//Throw an error with the error message if the Delete request is unsuccessful
      }
      // Update the 'data' state by filtering out the deleted item
      setData((prevData) => prevData.filter((track) => track.trackId !== trackId));
      console.log(response);//Display response in the console
    }
    catch (error) {
      //Handle errors that may occur during the fetch operation
      setError('Error deleting the item: ' + error.message);// Set an error message in the 'error' state
    }
  };

  //=========== MEDIA TYPES ARRAY===================
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

  // =================JSX RENDERING======================

  return (
    <>
      <div id="appBody">
        {/* Header */}
        <header id="header">
          <h1 className="h1">ITUNES API</h1>
        </header>
        {/* Section 1 */}
        <section id="section1">
          {/* Use the FormComponent and pass required props */}
          <Form
            term={term}
            setTerm={setTerm}
            type={type}
            setType={setType}
            handleSearch={handleSearch}
            handleAddItem={handleAddItem}
            mediaTypes={mediaTypes}
          />
        </section>
        {/* Section 2 */}
        <section id="section2">
          {error ? (
            <div className="errorMessage">{error}</div>
          ) : !isLoaded ? (
            <p>Loading...</p>
          ) : (
            <ul id="itemsList">
              {data.map((item) => (
                <li key={item.trackId}>
                  <h2 className='h2'>FAVOURITES</h2>
                  <h3>{item.artistName}</h3>
                  <h3>TITLE: {item.trackName}</h3>
                  <h3>TYPE: {item.kind}</h3>
                  {/* Delete button for each item */}
                  <button
                    id="deleteBtn"
                    onClick={() => deleteItem(item.trackId)}
                  >
                    DELETE
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
