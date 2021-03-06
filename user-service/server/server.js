let winston = require('./winston');
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let app = express();
let routes = require('./routes');
let path = require('path');
let expressValidator = require('express-validator');
require('dotenv').config();
app.use(cors());
app.use(expressValidator());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

let PORT = process.env.PORT;

routes(app);

app.listen(PORT , () => {
    winston.logger.info(`Waiting user-service for requestes on port : ${PORT}`);
});
