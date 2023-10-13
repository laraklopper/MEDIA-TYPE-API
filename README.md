# LT4-CAPSTONE1

An API (Application Programming Interface) call is a set of protocols, procedures, and tools that allow interaction between two applications. 
It is the software intermediary that delivers a request to the server and then relays a response back to the client (typically a web service or server). 

**EXPRESS AND REACT**
1. **On the Server (Express.js) :**
   - The Express.js server acts as a backend or server-side application.
   - It provides API endpoints that can be used to fetch or manipulate data
   - The server handles incoming requests from the React client and processes them.

    The Express.js server, defines routes and handle incoming HTTP requests. For example:

   ```javascript
   const express = require('express');
   const app = express();
   const port = process.env.PORT || 3000;

   app.get('/api/data', (req, res) => {
     // Handle the request, maybe send some data back
     res.json({ message: 'Hello from the server!' });
   });

   app.listen(port, () => {
     console.log(`Server is listening at http://localhost:${port}`);
   });
   ```

3. **On the React Client (using `fetch`):**
  - The React client is a frontend application running in the user's browser.
  - It communicates with the Express.js server to fetch data or send requests.
  - When the React app needs data, it makes HTTP requests (typically using the `fetch` function or libraries like Axios) to the API endpoints exposed by the Express.js server.
  - Once the data is received from the server, React updates its state, and the UI is re-rendered to display the fetched data
  
   On the client side (e.g., in a browser script or a frontend framework) the `fetch` API to makes requests to your server:

   ```javascript
   fetch('http://localhost:3000/api/data')
     .then(response => response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error:', error));
   ```

## TABLE OF CONTENTS
1. [HOW TO RUN THE APP](#how-to-run-the-application)
2. [HOW TO USE THE APP](#how-to-use-the-application)
3. [SECURITY MEASURES](#security-measures)
4. [LINK TO DEPLOYED APP](#link-to-deployed-app)
5. [TASK API LINK](#task-api-link)
6. [INSTALLED DEPENDENCIES](#installed-dependencies)
7. [REFERENCES](#references)

## HOW TO RUN THE APPLICATION

## HOW TO USE THE APPLICATION

## SECURITY MEASURES

## LINK TO DEPLOYED APP

## TASK API LINK
https://itunes.apple.com/search?term=${term}+&entity=${type}

## INSTALLED DEPENDENCIES
**DEPENDENCIES INSTALLED IN THE TERMINAL:**

- express (**npm install express**)
- nodemon (**npm install nodemon**)
- bodyParser (**npm install body-parser**)
- cors (**npm install cors**)
- helmet (**npm install --save helmet**)
- express-session (**npm install express-session**)

## REFERENCES
- https://www.npmjs.com/package/helmet?activeTab=readme
- https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
- https://developer.apple.com/documentation/applemusicapi/handling_requests_and_responses
- https://developer.apple.com/documentation/applemusicapi/generating_developer_tokens
- https://www.tutorialspoint.com/express-js-express-json-function
- https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
