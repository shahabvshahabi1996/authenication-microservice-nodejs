const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name : String,
    family : String,
    username : {
        type : String,
        unique : true
    },
    password : {
        type : String,
        min : 6
    },
    email : {
        type : String ,
        unique : true
    }
});

module.export = mongoose.model('User',User);