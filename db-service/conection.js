const mongoose = require('mongoose');
require('dotenv').config();

const userinfo = {
    name : process.env.DB_USER,
    password : process.env.DB_PASSWORD
}
mongoose.connect(`mongodb://${userinfo.name}:${userinfo.password}@ds239127.mlab.com:39127/test_db`); //link

mongoose.connection.on('open',() => {
    console.log('we are connected to mongodb DBMS!!!');
}).on('error',() => {
    console.log('something went wrong on mongodb connection!!!');
});