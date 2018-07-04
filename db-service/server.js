const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


const PORT = 8000 || process.env.PORT;

const User = require('./model');

require('./conection');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT , () => {
    console.log(`Waiting db-service for requestes on port : ${PORT}`)
});

app.route('/').get((req,res) => {
    res.send('Hello to db-service');
});

app.route('/user').post((req,res) => {
    console.log(req.body);
});