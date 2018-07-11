const User = require('./model');

exports.registerUser = async (info) => {

    let user = await User.findOne({email : info.email});

    if(user) {
        return false;
    }
    else {
        new User({
            email : info.email,
            name : info.name,
            family : info.family,
            password : info.password,
            username : info.username
        }).save((err,result) => {
            if(err) {
                console.log(err);
            }
            
            return true;
        });
    }

}

exports.findUser = async (info) => {
    let user = await User.findOne({email : info.email , password : info.password});
    if (user) {
        
        return user;
    }

    return false;
}