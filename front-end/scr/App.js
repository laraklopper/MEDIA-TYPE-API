import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './App.css'


export default function App() {
    const [searchResults, setSearchResults] = useState([]);

    
 const handleSearch = (data) => {
    setSearchResults(data);
  };

    const search = (event) => {
    event.preventDefault();
    search(item);
  }
  return (
    <>
        <Container fluid="md" className='appContainer'>
        <header id='header'>
          {/* Row 1 */}
          <Row className='row' id='heading'>
            <Col className='col'>
              <h1 className='h1'>Itunes Search API</h1>
            </Col>
          </Row>
        </header>
          {/* section1 */}
   <section id='section1'>
          {/* Row2 */}
          
          <Row>
            <Col>API</Col>
            <Col></Col>
            <Col>
              <form id='searchForm' onClick={search}>

                <input
                  type='text'
                  placeholder='search'
                  value={item}
                  onChange={handleChange}
                />


                <Button type='submit' variant="primary" id='searchBtn'>
                  SEARCH
                </Button>

              </form>  
            </Col>
          </Row>
        </section>
      </Container>
    </>
  )
}
