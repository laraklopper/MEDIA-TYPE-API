import React, { useState } from 'react'
// import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import './App.css'


export default function App() {
    const [item, setItem] = useState("")
    const handleChange = (event) => {
    setItem(event.target.value);
  }

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
        // section1
    <section>

    </section>
      </Container>
     <div>
      <Stack direction="horizontal" gap={3} id='stack'>
        <div className="p-2" id='heading'><Header /></div>
        <form id='searchForm' onClick={search}>
          <div className="p-2 ms-auto" id='formInput'>
            <input
              type='text'
              placeholder='search'
              value={item}
              onChange={handleChange}
            />
          </div>
          // <div className="p-2" id='searchButton'>
            <Button type='submit' variant="primary" id='searchBtn'>
              SEARCH
            </Button>
          </div>
        </form>     
      </Stack>
      </div>
    </>
  )
}
