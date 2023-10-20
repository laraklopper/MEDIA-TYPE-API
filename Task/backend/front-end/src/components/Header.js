import React from 'react';// Import the React module to use React functionalities
import Row from 'react-bootstrap/Row';//Import bootstrap row 
import Col from 'react-bootstrap/Col';//Import bootstrap coloumn

//Header function component
export default function Header() {//Export default header function component

    //===========JSX RENDERING==================
    
  return (
    // Header
      <header id="header">
          {/* Row 1 */}
          <Row className='row'>
              <Col id='heading'>
                <h1 className="h1">ITUNES API</h1>
              </Col>
          </Row>
      </header>
  )
}
