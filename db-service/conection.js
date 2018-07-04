const mongoose = require('mongoose');

const userinfo = {
    name : 'admin',
    password : 'admin123456'
}
mongoose.connect(`mongodb://${userinfo.name}:${userinfo.password}@ds239127.mlab.com:39127/test_db`); //link

mongoose.connection.on('open',() => {
    console.log('we are connected to mongodb DBMS!!!');
}).on('error',() => {
    console.log('something went wrong on mongodb connection!!!');
});