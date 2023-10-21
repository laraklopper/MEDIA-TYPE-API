# LT4-CAPSTONE1

## TABLE OF CONTENTS
1. [HOW TO USE THE APPLICATION](#how-to-use-the-application)
2. [HOW TO RUN THE APPLICATION](#how-to-run-the-application)
3. [SECURITY MEASURES](#security-measures)
4. [LINK TO DEPLOYED APPLICATION](#link-to-deployed-app)
5. [REFERENCES](#references)

## HOW TO USE THE APPLICATION

To use the app the user must input a name and select a media type. Thereafter the user can add an item from the data to a list of favourites. The app also allows the user to delete a item on the favourites list after adding it to the favourites list and also to delete an item from the favourites list. 
The App uses an Api (Application Programming Interface) to get the relavent data.  When the React app needs data, it makes HTTP requests to the API endpoints exposed by the Express.js server. The Express.js back-end server handles incoming requests from the React.js front-end client and processes them. Once the data is received from the server, React updates its state, and the UI is re-rendered to display the fetched data

The App uses the following API to fetch the data:

`https://itunes.apple.com/search?term=${term}+&entity=${type}`


## HOW TO RUN THE APPLICATION

The React front-end of the can be started in the terminal using npm start. The app can therefore be run using the npm start command in the terminal. To get the front-end and backend to work together the app uses a proxy server.


## SECURITY MEASURES

The app uses Cross-Origin Resource Sharing (CORS)  and helmet middleware in the Express.js backend server. CORS is a HTTP-Header based system thich is implemented by the browser to specifying the origins that can make requests to the browser. Helmet provides a set that help secure an Express.js application by setting various HTTP headers. The purpose of Helmet is to help secure an Express.js application against security threats.Helmet is designed to be easy to use, and does not typically require that don't need to configure each header individually. Instead it is used as a collection of headers that help improve security. The app.use method is used to mount the middleware. 

   ```javascript
   const express = require('express');// Import Express.js web framework to build the web server
   const helmet = require('helmet');// Import helmet middleware for security headers
   const app = express();// Create an Express application
   const port = process.env.PORT || 3001;// Define the port for the server to listen on

  //===========SETUP MIDDLEWARE=======================

   app.use(cors({
     origin: 'http://localhost:3000',  // Allow requests from the specified origin
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',  // Specify the allowed HTTP methods for cross-origin requests
     credentials: true,// Allow credentials to be included in cross-origin requests 
     optionsSuccessStatus: 204,  // Set the HTTP status code for successful preflight OPTIONS requests to 204 (No Content)
   }));
   app.use(helmet());// Middleware to secure Express app by setting HTTP response headers.

    
   //====================START THE SERVER==================================
   // Start the server and listen on the specified port
   app.listen(port, () => {
       console.log(`Server is listening on port ${port}`); // Display a message in the console indicating that the server is running.
   });
   ```



## LINK TO DEPLOYED APP

## REFERENCES
- https://www.npmjs.com/package/helmet?activeTab=readme
- https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
- https://developer.apple.com/documentation/applemusicapi/handling_requests_and_responses
- https://developer.apple.com/documentation/applemusicapi/generating_developer_tokens
- https://www.tutorialspoint.com/express-js-express-json-function
- https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
- https://expressjs.com/en/4x/api.html#app.use 
- https://www.geeksforgeeks.org/rest-api-introduction/
- https://www.digitalocean.com/community/tutorials/how-to-write-snapshot-tests-for-react-components-with-jest
