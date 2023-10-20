# LT4-CAPSTONE1

## TABLE OF CONTENTS

1. [HOW TO USE THE APP](#how-to-use-the-application)
2. [HOW TO RUN THE APP](#how-to-run-the-application)
3. [SECURITY MEASURES](#security-measures)
4. [LINK TO DEPLOYED APP](#link-to-deployed-app)
5. [REFERENCES](#references)

## HOW TO USE THE APPLICATION

To use the app the user must input a name and select a media type. Thereafter the user can add an item from the data to a list of favourites. The app also allows the user to delete a item on the favourites list after adding it to the favourites list.To use the app the user must input a name and select a media type. Thereafter the user can add an item from the data to a list of favourites. The app also allows the user to delete a item on the favourites list after adding it to the favourites list. 

The App uses an Api (Application Programming Interface) to get the relavent data.  When the React app needs data, it makes HTTP requests to the API endpoints exposed by the Express.js server. The Express.js back-end server handles incoming requests from the React.js front-end client and processes them. Once the data is received from the server, React updates its state, and the UI is re-rendered to display the fetched data

The App uses the following API to fetch the data:

`https://itunes.apple.com/search?term=${term}+&entity=${type}`

## HOW TO RUN THE APPLICATION

React is used for building front-end apps that can communicate with the backend server. To get the front-end and backend to work together the app uses a proxy server. To run the app both the back end Express.js and front end React.js servers must be running. Both the Express.js and React.js servers can be run using the `npm start` command terminal. 

## SECURITY MEASURES

For security the Express.js backend server uses helmet which middleware installed to secure the Express app by setting up several HTTP response headers. The app.use method is used to mount the middleware. By default helmet sets several headers. These headers include protection against common security vunerabilities.
   ```javascript
   const express = require('express');// Import Express.js web framework to build the web server
   const helmet = require('helmet');// Import helmet middleware for security headers
   const app = express();// Create an Express application
   const port = process.env.PORT || 3001;// Define the port for the server to listen on

  //===========SETUP MIDDLEWARE=======================
   app.use(helmet());// Middleware to secure Express app by setting HTTP response headers.

    
   //====================START THE SERVER==================================
   // Start the server and listen on the specified port
   app.listen(port, () => {
       console.log(`Server is listening on port ${port}`); // Display a message in the console indicating that the server is running.
   });
   ```
```
npm i -

## LINK TO DEPLOYED APP


## REFERENCES
- https://www.npmjs.com/package/helmet?activeTab=readme
- https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
- https://developer.apple.com/documentation/applemusicapi/handling_requests_and_responses
- https://developer.apple.com/documentation/applemusicapi/generating_developer_tokens
- https://www.tutorialspoint.com/express-js-express-json-function
- https://www.geeksforgeeks.org/know-the-difference-between-rest-api-and-restful-api/
- https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
- https://expressjs.com/en/4x/api.html#app.use
- https://www.geeksforgeeks.org/rest-api-introduction/ 
