const express = require('express');
//const fs = require('fs');
//const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 8000;

app.listen(port, () =>{
    console.log(`app is listening in" ${port}`);
})