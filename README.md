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


For security the Express.js backend server uses helmet which middleware installed to secure the Express app by setting up several HTTP response headers. The app.use method is used to mount the middleware.  These headers include protection against common security vunerabilities.
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


The `app.use(helmet())` line adds by default adds all Helmet middleware head to an Express application. 
By default, Helmet sets the following headers:

- **Content-Security-Policy**: A powerful allow-list of what can happen on your page which mitigates many attacks
- **Cross-Origin-Opener-Policy**: Helps process-isolate your page
- **Cross-Origin-Resource-Policy**: Blocks others from loading your resources cross-origin
- **Origin-Agent-Cluster**: Changes process isolation to be origin-based
- **Referrer-Policy**: Controls the Referer header
- **Strict-Transport-Security**: Tells browsers to prefer HTTPS
- **X-Content-Type-Options**: Avoids MIME sniffing
- **X-DNS-Prefetch-Control**: Controls DNS prefetching
- **X-Download-Options**: Forces downloads to be saved (Internet Explorer only)
- **X-Frame-Options**: Legacy header that mitigates clickjacking attacks
- **X-Permitted-Cross-Domain-Policies**: Controls cross-domain behavior for Adobe products, like Acrobat
- **X-Powered-By**: Info about the web server. Removed because it could be used in simple attacks
- **X-XSS-Protection**: Legacy header that tries to mitigate XSS attacks, but makes things worse, so Helmet disables it

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
