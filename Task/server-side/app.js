const express = require('express');  // Import Express.js web framework to build the web server
const helmet = require('helmet');// Import helmet middleware for security headers
const bodyParser = require('body-parser');  // Import bodyParser middleware to parse request bodies
const cors = require('cors');  // Import cors middleware to handle Cross-Origin Resource Sharing
const app = express();  // Create an Express application
const port = process.env.PORT || 3001;  // Define the port for the server to listen on

//=================SETUP MIDDLEWARE======================
app.use(bodyParser.urlencoded({ extended: false }));  // Parse incoming requests with payloads attached to it
app.use(bodyParser.json());  // Returns middleware that parses and requests where the Content-Type matches the type option.
app.use(cors());  // Enables CORS for handling cross-origin requests.

//------------HELMET MIDDLEWARE TO SECURE THE EXPRESS APP----------------------
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                "script-src": ["'self'"],
                "style-src": null,
            },
        },
    })
);

//=====================DATA STORAGE============================
// In-memory array used to store the data 
let data = [];

//========================REQUESTS================================
//------------------GET REQUEST-------------------------
// Handle GET request to '/submit-form'
app.get('/submit-form', (req, res) => {
    res.json(data);    // Send a JSON response containing the data array
//provide a JSON representation of the data stored on the server when a GET request is made to '/submit-form'.
});

//---------------------------POST REQUEST------------------------------
//Post endpoint to add new data
// Handle POST request to '/api/add-item'
app.post('/api/add-item', (req, res) => {
    try {
        const newItem = req.body;        // Extract the new item data from the request body

        // Check if valid data is received
        if (!isValidItem(newItem)) {
            throw new Error('Invalid data received'); // If data is not valid, throw an error
        }

        data.push(newItem);        // Add the new item to the 'items' array


        // Send a JSON response with the added item
        res.status(201).json(newItem); // 201 Created status for successful POST requests

    } 
    catch (error) {
        // Handle errors that may occur during the POST request
        console.error('Error adding item:', error.message);
        res.status(500).json({ error: 'Failed to add new item' });// Send an error response with a 500 status code

    }
});
//=====================DELETE ENDPOINT=====================
//Delete endpoint to remove data
app.delete('/api/:trackId', (req, res) => {
    // Extract the trackId parameter from the URL
    const trackId = req.params.trackId

    // Filter out the item with the specified trackId from the data array
    data = data.filter((item) => item.trackId !== trackId);

    //Respond with success and status 200
    res.status(200).json({ success: true })
})

//======================FUNCTIONS============================
// Function to check if an item is valid
function isValidItem(item) {
    // Customise this function based on the expected structure of items
    return item && item.trackId && item.artistName && item.trackName && item.kind;
}

//====================START THE SERVER==================================
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Display a message in the console indicating that the server is running.
});
