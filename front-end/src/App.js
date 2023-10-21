import React, { useState, useEffect } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS stylesheet
import Button from 'react-bootstrap/Button';// Import button component from bootstrap library
import Container from 'react-bootstrap/Container';//Import bootstrap container
import Row from 'react-bootstrap/Row';//Import bootstrap row 
import Col from 'react-bootstrap/Col';//Import bootstrap coloumn
import Form from './components/Form.js';//Import Form function component
import Header from './components/Header';//Import Header function component

//App function component
export default function App() {//Export default App function component
  //==============STATE VARIABLES=================
  const [error, setError] = useState(null);// State used to store error information
  const [isLoaded, setIsLoaded] = useState(false);//State used to track whether data is loaded
  const [term, setTerm] = useState('');// State for the term input
  const [type, setType] = useState('');// State for the type input
  const [data, setData] = useState([]);// State to store fetched data
  const [favourites, setFavourites] = useState([]);//State to store favorites

  //===================FETCH JSON DATA=====================
  // Fetch initial data from the server on component mount
  useEffect(() => {
    async function fetchData() {//Define asynchronous function to fetch data
      try {
        // Fetch data from the server
        const response = await fetch('http://localhost:3001/submit-form');

        //Conditional rendering to check the 'ok' property of the response object
        if (!response.ok) {
          throw new Error();//Throw an error message if the request is unsuccessful
        }

        const jsonData = await response.json();// Parse the JSON data and set the initial term state
        setTerm(jsonData[0].term);// Set the value of the term state to the first object ([0]) of the jsonData array.
        setIsLoaded(true);//Update the loading status to true
      }
      catch (error) {
        // Handle errors that may occur during the fetch operation
        console.error('Error fetching data:', error);//Display error message in the console
        setError('Failed to load the data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    fetchData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  //============================FUNCTIONS TO HANDLE REQUESTS=============================== 
  //=========================FUNCTION TO SEARCH FOR API DATA==============================
  const handleSearch = async (event) => {//Define asynchronous function to fetch API data
    event.preventDefault();// Prevent the default form submission behavior

    try {
      // Check if term and type are provided
      if (!term || !type) {
        throw new Error('Term and Type are required for search');//Throw an error message if the parameters are missing
      }

      // Fetch data from the iTunes API based on 'term' and 'type'
      const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=${type}`);
      setError(false);// Reset the error state to false to clear any previous errors

      // Conditional rendering to check the 'ok' property of the 'response' object 
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);//Throw an error message if the response is unsuccessful
      }

      const searchData = await response.json();    // If the response is successful, parse the JSON data
      setData(searchData.results);    // Update the state with the search results
      console.log(searchData);;//Display search results in the console
    }
    catch (error) {
      // Handle errors that may occur during the fetch operation
      console.error('Error fetching data:', error.message);
      setError('Failed to fetch search results');// Set the error state with a message indicating the failure
    }
  };

  //--------------------------DELETE REQUEST-----------------------------
  //Function to delete an item
  const deleteItem = async (trackId) => {//Define asynchronous function to delete an item using the fetch function
    try {
      // Send a DELETE request to the server
      const response = await fetch(`http://localhost:3001/api/${trackId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-Type': 'application/json',//Type of content being passed
        },
      });
      setError(false);//Reset error status to false to clear any previous errors

      // Check if the DELETE request is successful; otherwise, throw an error
      if (!response.ok) {
        throw new Error('Failed to delete item');//Throw an error with the error message if the Delete request is unsuccessful
      }

      setData((prevData) => prevData.filter((track) => track.trackId !== trackId));// Update the 'data' state by filtering out the deleted item
      console.log(response);//Display response in the console
    }
    catch (error) {
      //Handle errors that may occur during the fetch operation
      setError('Error deleting the item: ' + error.message);// Set an error message in the 'error' state
    }
  };
  //======================FUNCTIONS TO UPDATE FAVOURITES=====================
  // Function to add an item to the favorites list
  const addToFavorites = (fav) => {
    setFavourites((prevFavourites) => [...prevFavourites, fav]);// Update the state of the favourites list
  };

  // Function to delete an item from the favourites list
  const deleteFavorite = (trackId) => {
    setFavourites((prevFavourites) => prevFavourites.filter((fav) => fav.trackId !== trackId));// Update the state of the favorites list by excluding the item with the specified trackId
  };

  //====================JSX RENDERING================================

  return (
    <>
      {/* App body */}
      <div id='appBody'>
        {/* AppContainer */}
        <Container id='appContainer'>
          {/* Header */}
          <Header />
          {/* Section 1 */}
          <section id="section1">
            {/* Row 2 */}
            <Row id='formRow'>
              {/* Use the Form Component and pass required props */}
              <Form
                term={term}
                setTerm={setTerm}
                type={type}
                setType={setType}
                handleSearch={handleSearch}
              />
            </Row>
          </section>
          {/* Section 2 */}
          <section id="section2">
            {/* Row 3 */}
            <Row>
              <Col id="dataCol">
                <h2 className='h2'>API DATA</h2>
                {error ? (
                  <div className="errorMessage">{error}</div>
                ) : !isLoaded ? (
                  <p>Loading...</p>
                ) : (
                  <dl id="itemsList">
                    {/* Map through the 'data' array to render each item */}
                    {data.map((item) => (
                      <dt className='desTitle' key={item.trackId}>
                        <h3 className='h3'>{item.artistName}</h3>{/* Display artist name */}
                        <dd className='description'><h4 className='h4'>TITLE:</h4><h5 className='h5'>{item.trackName}</h5></dd>{/* Display title of the track */}
                        <dd className='description'><h4 className=''>TYPE:</h4><h5 className='h5'>{item.kind}</h5></dd>{/* Display the type of the track */}
                        {/* Delete button for each item */}
                        <dd className="descriptionBtn">
                          <Button
                            variant='primary'
                            id="deleteBtn"
                            onClick={() => deleteItem(item.trackId)}//onClick eventlistener used to delete an item.
                          >
                            DELETE
                          </Button>
                        </dd>
                        {/* Button used add to list favourites */}
                        <dd className="descriptionBtn">
                          <Button
                            variant="primary"
                            onClick={() => addToFavorites(item)}//onClick eventlistener used to add a item to the list of favourites
                            id="addButton"
                          >
                            ADD TO FAVOURITES
                          </Button>
                        </dd>
                      </dt>
                    ))}
                  </dl>
                )}
              </Col>
              {/* Column containing favourites list */}
              <Col id='favCol'>
                {/* Favorites list */}
                <h2 className='h2'>FAVOURITES</h2>
                <dl className="favouritesList">
                  {/* Map through the Favourites array to render each Favourite */}
                  {favourites.map((fav) => (
                    <dt key={fav.trackId} className="favTitle">
                      <h3 className='h3'>{fav.artistName}:</h3>
                      <dd className='description'><h4 className='h4'>TITLE:</h4><h5 className='h5'>{fav.trackName}</h5></dd>
                      <dd className='description'><h4 className='h4'>TYPE:</h4><h5 className='h5'> {fav.kind}</h5> </dd>
                      <dd className="description">
                        <Button
                          variant='primary'
                          id="deleteFavBtn"
                          onClick={() => deleteFavorite(fav.trackId)}
                        >
                          DELETE FROM FAVOURITES
                        </Button>
                      </dd>
                    </dt>
                  ))}
                </dl>
              </Col>
            </Row>
          </section>
        </Container>
      </div>
    </>
  );
}