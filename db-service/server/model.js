let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let User = new Schema({
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

module.exports = mongoose.model('User',User);