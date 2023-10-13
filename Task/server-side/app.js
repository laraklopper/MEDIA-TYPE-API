const express = require('express');// Import the Express web framework
const bodyParser = require('body-parser');//Import the bodyParser module
const app = express();// Create an instance of the Express application
const cors = require('cors');//Import the cors module
const port = process.env.PORT || 3001;// Define the port the server will listen on

//=========================MIDDLEWARE SETUP======================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//====================GET REQUES==========================
app.get('/api/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form Data Received:', formData);
    res.json({ formData });
});

//==================START THE SERVER=============================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);//Display a message in the console indicating that the server is running.
});
