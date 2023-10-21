const express = require('express'); // Web framework for handling HTTP requests
const helmet = require('helmet'); // Middleware for setting various HTTP headers for security
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling Cross-Origin Resource Sharing
const path = require('path'); // Module for working with file and directory path
const app = express();// Create an Express application
const port = process.env.PORT || 3001;// Define the port for the server to listen on


//======================SETUP MIDDLEWARE================================
// Parse URL-encoded and JSON request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Security middleware
// Enable CORS for specified origin, allowing certain HTTP methods, handling credentials, and defining options success status
// Use the 'cors' middleware with specified options
app.use(cors({
    origin: 'http://localhost:3001',  // Allow requests from the specified origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Specify the allowed HTTP methods for cross-origin requests
    credentials: true,// Allow credentials to be included in cross-origin requests 
    optionsSuccessStatus: 204,  // Set the HTTP status code for successful preflight OPTIONS requests to 204 (No Content)
}));

// Set various HTTP headers to enhance security
app.use(helmet());

//================SERVE STATIC FILES FROM THE SPECIFIED DIRECTORY=======================
app.use(express.static(path.join(__dirname, 'backend')));// Use the 'express.static' middleware to serve static files


//=======================DATA STORAGE================================
// In-memory array used to store the data
let data = [];

//========================REQUESTS================================
//------------------GET REQUEST-------------------------
// Define a route to handle GET requests to '/submit-form'
app.get('/submit-form', (req, res) => {
    res.json(data);  // Respond with the data stored in memory
    //provides a JSON representation of the data stored on the server when a GET request is made to '/submit-form'.
});

//---------------------------POST REQUEST------------------------------
//Post endpoint to add new data
// Define a route to handle POST requests to '/api/add-item'
app.post('/api/add-item', (req, res) => {
    try {
        const newItem = req.body; // Extract the new item from the request body

        // Conditional rendering to check if the received data is valid
        if (!isValidItem(newItem)) {
            throw new Error('Invalid data received');//If the data recieved is not valid, throw an error
        }

        data.push(newItem);// Add the new item to the in-memory data array

        res.status(201).json(newItem);// Respond with a success status & the added item

    }
    catch (error) {
        //Handle errors that occur during the POST request
        console.error('Error adding item:', error.message); // Log and respond with an error if there is an issue adding the item
        res.status(500).json({ error: 'Failed to add new item' });// Send an error response with a 500 status code
    }
});

//=====================DELETE REQUEST=====================
// Define a route to handle DELETE requests to '/api/:trackId'
app.delete('/api/:trackId', (req, res) => {
    const trackId = req.params.trackId;  // Extract the trackId from the request parameters


    // Filter out the item with the specified trackId from the data array
    data = data.filter((item) => item.trackId !== trackId);

    res.status(200).json({ success: true });  // Respond with a success status
});

//=================FUNCTIONS=================
// Function to check if an item is valid
function isValidItem(item) {
    return item && item.trackId && item.artistName && item.trackName && item.kind;
}

//=================START THE SERVER=============================
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);//Display a message in the console indicating that the server is running.
});