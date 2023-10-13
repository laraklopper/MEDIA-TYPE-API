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
    res.json([term, 'Default term']);//Respond with a default term
});
//==================POST REQUEST=========================
// Endpoint to handle adding a new item
app.post('/api/add-item', (req, res),=> {
    const newItem = req.body;  // Get the new item from the request body
    items.push(newItem);//Add new item to data storage
    res.json(newItem);//Respond with added item
} )
//==================START THE SERVER=============================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);//Display a message in the console indicating that the server is running.
});
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Simulated data storage
let items = [];

app.get('/submit-form', (req, res) => {
  res.json([{ term: 'Default Term' }]);
});

app.post('/api/add-item', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.json(newItem);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
