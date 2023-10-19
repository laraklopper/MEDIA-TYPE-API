import React from 'react';// Import the React module to use React functionalities
import Button from 'react-bootstrap/Button';// Import button component from bootstrap library
import Col from 'react-bootstrap/Col';//Import bootstrap coloumn

//Form function component
export default function Form({ term, setTerm, type, setType, handleSearch }) {//Export default form function component
  //==============MEDIA TYPES ARRAY===================================
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

  //=================JSX RENDERING================================

  return (
    // Form
    <form id='form' onSubmit={handleSearch}>
        <Col>
        {/* Input for term */}
          <label className='label'>NAME:</label>
          <input
            type='text'
            placeholder='Name'
            value={term}
             onChange={(e) => setTerm(e.target.value)}// onChange event used to update the type state when the user enters input
            className='input'
          />
          {/* Input for mediatype */}
          <label className='label'>MEDIA TYPE:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}// onChange event used to update the type state when the user selects a different option
          >
            {/* Map over the array of media types to create options */}
            {mediaTypes.map((mediaType) => (
              <option
                key={mediaType.value}
                value={mediaType.value}
                className='options'
              >
                {mediaType.name}
              </option>
            ))}
          </select>
        </Col>
        <Col>
        {/* Search Button */}
          <Button type="submit" variant="primary" id="searchBtn">
            SEARCH
          </Button>
        </Col>
     
    </form>
  );
};

