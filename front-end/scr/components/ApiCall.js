import React, { useState } from 'react';// Import the React module to use React functionalities
import Button from 'react-bootstrap/Button';

export default function ApiCall({ onSearch }) {
  const [name, setName] = useState('');
  const [mediaType, setMediaType] = useState('');

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeMediaType = (event) => {
    setMediaType(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // Make an asynchronous request to the API
      const response = await fetch(`https://api.example.com/search?name=${name}&mediaType=${mediaType}`);

      // Check if the response status is okay
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Extract data from the response
      const data = await response.json();

      // Call the onSearch prop with the fetched data
      onSearch(data);
    } catch (error) {
      // Handle errors during the API request
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <form id="form" onSubmit={handleSearch}>
        <label className='label'>NAME</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChangeName}
        />
        <label className="label">MEDIA TYPE</label>
        <input
          type="text"
          onChange={handleChangeMediaType}
          placeholder="Media type"
          value={mediaType}
            className="label"
        />
        <Button type="submit" variant="primary">
          SEARCH
        </Button>
      </form>
    </div>
  );
}
