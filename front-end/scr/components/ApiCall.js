import React, { useState } from 'react';// Import the React module to use React functionalities
import Button from 'react-bootstrap/Button';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // Assuming the API endpoint is 'https://api.example.com/search'
      const response = await fetch(`https://api.example.com/search?query=${query}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      onSearch(data); // Pass the fetched data to the parent component
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <label>SEARCH TERM</label>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleChange}
        />
        <Button type="submit" variant="primary">
          SEARCH
        </Button>
      </form>
    </div>
  );
}
