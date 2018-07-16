const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const path = require('path');
var expressValidator = require('express-validator');
require('dotenv').config();
app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

const PORT = process.env.PORT;

console.log(process.env);

routes(app);

app.listen(PORT , () => {
    console.log(`Waiting user-service for requestes on port : ${PORT}`)
});

