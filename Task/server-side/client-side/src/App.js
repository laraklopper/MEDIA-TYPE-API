import React, {  useEffect, useState, } from 'react';// Import the React module to use React functionalities
import './App.css';//Import css stylesheet
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component

//App function component
export default function App() {//Export default app function component
  //========== State variables=====================
  
  const [error, setError] = useState(null);// State for error handling
  const [term, setTerm] = useState('');// State for the term input
  const [type, setType] = useState('');// State for the type input
  const [data, setData] = useState([]);// State to store fetched data
  const [isLoaded, setIsLoaded] = useState(false);// State to track loading status



  //=============== FETCH API DATA ============


useEffect (() => {
  async function fetchData() {
    try {
      const response = await fetch('http://localhost:3001/api/submit-form')
      if (!response.ok) {
        throw new Error()
      }
      const jsonData = await response.json()
      setTerm(jsonData)
      setIsLoaded(true)
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load the data');
      setIsLoaded(true)
    }
  }
  fetchData()

},[]);

//=============EVENT LISTENERS====================


  // Handle form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      // Fetch data from iTunes API based on 'type' and 'term' for search
      const response = await fetch(`https://itunes.apple.com/search?term=${term}+&entity=${type}`);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const searchData = await response.json();
      setData(searchData.results);
      console.log(searchData)
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
    
  };
  

  //===============MEDIA TYPES===================
  const mediaTypes = [
    { name: "MUSIC", value: "music" },
    { name: "MUSIC VIDEO", value: "musicVideo" },
    { name: "APPS", value: "software" },
    { name: "EBOOK", value: "ebook" },
    { name: "AUDIO BOOK", value: "audiobook" },
    { name: "PODCAST", value: "podcast" },
    { name: "MOVIES", value: "movie" },
    { name: "TV SHOW", value: "tvShow" },
    { name: "SHORT FILM", value: "shortFilm" },
  ];
  
  //==============JSX RENDERING=====================

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
            <label className='label'>NAME</label>
            {/* Input field for 'term' */}
            <input
              type="text"
              placeholder="name"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />

            <label className='label'>MEDIA TYPE</label>
            {/* Input field for 'type' */}
            <select>
              {mediaTypes.map((mediaTypes, i)=>(
                
                <option
                value={mediaTypes.value}
                key={i}
                onChange={(e) => setType(e.currentTarget.value)}
                >{mediaTypes.value}</option>
              ))}
            </select>

            {/* Submit button */}
            <Button type="submit" variant="primary" id='searchBtn' onClick={handleSearch}>
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
                  {/* Display each item in the 'data' array */}
              {data.map((item,i) => (
                <li key={item.i}>{item.name}</li>
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