const express = require('express');// Import the Express web framework
const bodyParser = require('body-parser');//Import the bodyParser module
const app = express();// Create an instance of the Express application
const cors = require('cors');//Import the cors module
const port = process.env.PORT || 3001;// Define the port the server will listen on

//=========================MIDDLEWARE SETUP======================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//-------------Data storage----------------
let items = [];

//====================GET REQUEST==========================
app.get('/submit-form', (req, res) => {
    const term = req.query.term
    const type = req.query.type

    / Perform some logic based on term and type
    // ...

    // Send a response back to the client
    res.json({ term, type, message: 'Received your request!' });
});
//==================POST REQUEST=========================
// Endpoint to handle adding a new item
app.post('/api/add-item', (req, res) => {
    try {
        const newItem = req.body;
        if (!newItem) {
            throw new Error('Invalid data received');
        }

        items.push(newItem);
        res.json(newItem);
    } catch (error) {
        console.error('Error adding item:', error.message);
        res.status(500).json({ error: 'Failed to add new item' });
    }
});
//==================START THE SERVER=============================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);//Display a message in the console indicating that the server is running.
});
