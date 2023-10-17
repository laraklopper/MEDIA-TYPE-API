const express = require('express');  // Import Express.js web framework to build the web server
const bodyParser = require('body-parser');  // Import bodyParser middleware to parse request bodies
const cors = require('cors');  // Import cors middleware to handle Cross-Origin Resource Sharing
const app = express();  // Create an Express application
const port = process.env.PORT || 3001;  // Define the port for the server to listen on
const helmet = require ("helmet");// Import helmet middleware for security headers

//=================SETUP MIDDLEWARE======================
app.use(bodyParser.urlencoded({ extended: false }));  // Parse incoming requests with payloads attached to it
app.use(bodyParser.json());  // Returns middleware that parses and requests where the Content-Type matches the type option.
app.use(cors());  // Enables CORS for handling cross-origin requests.
app.use(helmet());// Middleware to secure Express app by setting HTTP response headers.
//=====================DATA STORAGE============================
// Array to store items 
let items = [];

//========================REQUESTS================================
//------------------GET REQUEST-------------------------
// Handle GET request to '/submit-form'
app.get('/submit-form', (req, res) => {
    // Extract query parameters from the request
    const term = req.query.term; // Get the term from the query parameter
    const type = req.query.type; // Get the type from the query parameter

    // Send a JSON response with the extracted parameters
    res.json({ term, type, message: 'Received your request!' });
});

//---------------------------POST REQUEST------------------------------
// Handle POST request to '/api/add-item'
app.post('/api/add-item', (req, res) => {
    try {
        const newItem = req.body; // Extract the new item from the request body

        // Check if valid data is received
        if (!newItem) {
            throw new Error('Invalid data received');
        }

        items.push(newItem); // Add the new item to the 'items' array

        // Send a JSON response with the added item
        res.json(newItem);

    } catch (error) {
        // Handle errors and send a 500 Internal Server Error response
        console.error('Error adding item:', error.message);
        res.status(500).json({ error: 'Failed to add new item' });
    }
});

//=========================FUNCTIONS====================================
// Function to get all items
function getAllItems() {
    return items;
}

// Function to delete an item by trackId
function deleteItem(trackId) {
    const index = items.findIndex((item) => item.trackId === trackId); // Callback function

    if (index !== -1) { // Remove the item from the 'items' array
        items.splice(index, 1);
    }
}

// Function to get an item by trackId
function getItemById(trackId) {
    return items.find((item) => item.trackId === trackId); // Find the item by trackID
}

//====================START THE SERVE==================================
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`); // Display a message in the console indicating that the server is running.
});
