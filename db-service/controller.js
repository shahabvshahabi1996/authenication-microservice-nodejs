const User = require('./model');

exports.registerUser = (info) => {
    new User({
        email : info.email,
        name : info.name,
        family : info.family,
        password : info.password,
        username : info.username
    }).save((err,result) => {
        if(err) 
        return false;

        else 
        return true;
    });
}

exports.findUser = async (info) => {
   const user =  User.findOne({email : info.email});
   if(user) {
       return user;
   }
}