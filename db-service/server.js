const express = require('express');
const app = express();


const PORT = 8000 || process.env.PORT;

const User = require('./model');

require('./conection');


app.listen(PORT , () => {
    console.log(`Waiting db-service for requestes on port : ${PORT}`)
});

