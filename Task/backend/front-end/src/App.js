import React, { useState, useEffect } from 'react';// Import the React module to use React functionalities
import './App.css';//Import CSS stylesheet
import Button from 'react-bootstrap/Button';// Import button component from bootstrap library
import Container from 'react-bootstrap/Container';//Import bootstrap container
import Row from 'react-bootstrap/Row';//Import bootstrap row 
import Col from 'react-bootstrap/Col';//Import bootstrap coloumn
import Form from './components/Form.js';//Import Form function component
import Header from './components/Header';//Import Header function component

// App component function component
export default function App() {//Export default App function component
  // ================STATE VARIABLES======================
  const [error, setError] = useState(null);//State used to store error information
  const [isLoaded, setIsLoaded] = useState(false);//State used to track whether data is loaded
  const [term, setTerm] = useState('');//State used to store term input
  const [type, setType] = useState('');//State used to store type input
  const [data, setData] = useState([]);//State used to store fetched data
  const [favourites, setFavourites] = useState([]);//State used to store fetched data

//====================FETCH JSON DATA========================
  // Fetch initial data from the server on component mount
  useEffect(() => {
    async function fetchData() {//Define asynchronous function to fetch data
      //Fetch the data from the server
      try {
        const response = await fetch('http://localhost:3001/submit-form');
      //Conditional rendering to check the 'ok' property of the response object
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);//Throw an error message if the request is unsuccessful
        }

        const jsonData = await response.json();// Parse the JSON data and set the initial term state
        setTerm(jsonData[0].term);// Set the value of the term state to the first object ([0]) of the jsonData array.
        setIsLoaded(true);//Update the loading status to true
      } catch (error) {
        //Handle errors that may occur during the fetch request
        console.error('Error fetching data:', error);//Display error message in the console
        setError('Failed to load the data');//Set an error message in the error state
        setIsLoaded(true);//Update the loading status to true
      }
    }

    fetchData();//Call the fetch data function
  }, []);// Empty dependency array means this effect runs only once after the initial render

 //============================FUNCTIONS TO HANDLE REQUESTS=============================== 
 //=========================FUNCTION TO SEARCH FOR API DATA==============================
  // Function to handle search
  const handleSearch = async (event) => {//Define asynchronous function to fetch API data
    event.preventDefault();// Prevent the default form submission behavior

    try {
      //Conditional rendering to check if the term & type are provided
      if (!term || !type) {
        throw new Error('Term and Type are required for search');//Throw an error message if the parameters are missing
      }
      
      // Fetch data from the iTunes API based on 'term' and 'type'
      const response = await fetch(`https://itunes.apple.com/search?term=${term}&entity=${type}`);

      // Conditional rendering to check the 'ok' property of the 'response' object 
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);//Throw an error message if the response is unsuccessful
      }

      const searchData = await response.json();// Parse the JSON data from the response body
      setData(searchData.results);// Update the 'data' state with the array of items from the parsed JSON data
      setError(null);// Clear any previous errors by setting the 'error' state to null
    } 
    catch (error) {
      // Handle errors that may occur during the fetch operation
      console.error('Error fetching data:', error.message);//Log an error message to the console for debugging purposes
      //The error.message contains details about the nature of the error.
      setData([]);// Clear the 'data' state to maintain a consistent state in case of an error
      setError('Failed to fetch search results');// Set an error message in the 'error' state
    }
  };

  //==========================DELETE REQUEST==============================
  // Function to delete an item
  const deleteItem = async (trackId) => {//Define asynchronous function to delete an item using the fetch function
    try {
      const response = await fetch(`http://localhost:3001/api/${trackId}`, {
        method: 'DELETE',//Request method
        headers: {
          'Content-Type': 'application/json',//Data type being passed
        },
      });
    //Conditional rendering to check the 'ok' property of the response object
      if (!response.ok) {
        throw new Error('Failed to delete item');//Throw an error message if the DELETE request is unsuccessful
      }

      setData((prevData) => prevData.filter((track) => track.trackId !== trackId));// Update the 'data' state by filtering out the deleted item
    } 
    catch (error) {
      //Handle errors that may occur during the fetch operation
      setError('Error deleting the item: ' + error.message);
    }
  };

  //======================FUNCTIONS TO UPDATE FAVOURITES=====================  
  // Function to add an item to the favorites list
  const addToFavorites = (fav) => {
    setFavourites((prevFavourites) => [...prevFavourites, fav]);// Update the state of the favourites list
  };

  // Function to delete an item from the favorites list
  const deleteFavorite = (trackId) => {
    setFavourites((prevFavourites) => prevFavourites.filter((fav) => fav.trackId !== trackId));// Update the state of the favorites list by excluding the item with the specified trackId
  };

//=====================JSX RENDERING==========================
  return (
    <>
      <div id='appBody'>
        <Container id='appContainer'>
          <Header />
          {/* Section 1: Form for searching */}
          <section id="section1">
            <Row id='formRow'>
              <Form
                term={term}
                setTerm={setTerm}
                type={type}
                setType={setType}
                handleSearch={handleSearch}
              />
            </Row>
          </section>
          {/* Section 2: Display data and favorites */}
          <section id="section2">
            <Row>
              {/* Column for displaying API data */}
              <Col id="dataCol">
                <h2 className='h2'>API DATA</h2>
                {error ? (
                  <div className="errorMessage">{error}</div>
                ) : !isLoaded ? (
                  <p>Loading...</p>
                ) : (
                  <dl id="itemsList">
                    {data.map((item) => (
                      <dt className='desTitle' key={item.trackId}>
                        <h3 className='h3'>{item.artistName}</h3>
                        <dd className='description'><h4 className='h4'>TITLE:</h4><h5 className='h5'>{item.trackName}</h5></dd>
                        <dd className='description'><h4 className=''>TYPE:</h4><h5 className='h5'>{item.kind}</h5></dd>
                        <dd className="descriptionBtn">
                          {/* Button to delete an item */}
                          <Button
                            variant='primary'
                            id="deleteBtn"
                            onClick={() => deleteItem(item.trackId)}
                          >
                            DELETE
                          </Button>
                        </dd>
                        <dd className="descriptionBtn">
                          {/* Button to add an item to favorites */}
                          <Button
                            variant="primary"
                            onClick={() => addToFavorites(item)}
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
              {/* Column for displaying favorites */}
              <Col id='favCol'>
                <h2 className='h2'>FAVOURITES</h2>
                <dl className="favouritesList">
                  {favourites.map((fav) => (
                    <dt key={fav.trackId} className="favTitle">
                      <h3 className='h3'>{fav.artistName}:</h3>
                      <dd className='description'><h4 className='h4'>TITLE:</h4><h5 className='h5'>{fav.trackName}</h5></dd>
                      <dd className='description'><h4 className='h4'>TYPE:</h4><h5 className='h5'> {fav.kind}</h5> </dd>
                      <dd className="description">
                        {/* Button to delete a favorite item */}
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
