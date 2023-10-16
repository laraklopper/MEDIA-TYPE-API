import React from 'react';// Import the React module to use React functionalities
import Button from 'react-bootstrap/Button';// Import button component from bootstrap library

// Form function component
export default function Form({ term, setTerm, type, setType, handleSearch, handleAddItem, mediaTypes }) {//Export default form function

//=================JSX RENDERING====================
    return (

        <div id='formBody'>
            {/* Form element with an onSubmit event handler */}
            <form
                id='form'
                onSubmit={handleSearch}
            >
                {/* Input for name */}
                <label className='label'>NAME</label>
                <input
                    type='text'
                    placeholder='name'
                    value={term}
                    onChange={(e) => setTerm(e.target.value)} // onChange event used when the user types into the input field
                    className='input'
                />

                {/* Dropdown for 'media type' */}
                <label className="label">MEDIA TYPE</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)} // onChange event used to update the type state when the user selects a different option
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

                {/* Submit button to trigger search */}
                <Button type="submit" variant="primary" id="searchBtn">
                    SEARCH
                </Button>
                {/* Button to add a new item */}
                <Button variant="primary" 
                onClick={handleAddItem} //onClick event to add new item
                id="addButton">  
                    ADD NEW ITEM
                </Button>
            </form>
        </div>
    );
}
