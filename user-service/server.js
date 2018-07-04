const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const routes = require('./routes');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'view')));
const PORT = 3000 || process.env.PORT;

routes(app);

app.listen(PORT , () => {
    console.log(`Waiting user-service for requestes on port : ${PORT}`)
});

