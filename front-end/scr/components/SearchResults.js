import React from 'react';// Import the React module to use React functionalities
import ListGroup from 'react-bootstrap/ListGroup';//Import Listgroup from bootstrap library

//SearchResults function component
export default function SearchResults ({results}){;//Export function component

return(
  <div>
    <h2>CONTENT</h2>
      <ListGroup as="ol" numbered>
      {/* Render the results based on the data received */}
           {results.map((result) => (
             
             <ListGroup.Item as="li" key={index}>
                        <h3>NAME:</h3><h4>{result.name}</h4>
                        <h3>MEDIA TT:</h3><h4>{result.mediaType}</h4>
              </ListGroup.Item>
        ))}
      </ListGroup>
  </div>
)
}
