let User = require('./model');

let winston = require('./winston');

let saveUser = async (info) => {
    let output = await new Promise((resolve,reject) => {    
        new User({
            email : info.email,
            password : info.password,
            family : info.family,
            name : info.name,
            username : info.username
        }).save((err,result) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    }).then(res => {
        return true
    }).catch(e => {
        return false;
    });

    return output;
}

exports.registerUser = (info) => {

    let res = new Promise((resolve,reject) => {
        resolve(FindUser(info));
    }).then(async(user) => {
        // console.log(user);
        if(user) {
            return false;
        }
    
        else {
            let final = await saveUser(info);
            console.log('this is save %s : ',final);
            return final;
        }
    });

    return res;

}

exports.findUser = async (info) => {
    let user = await User.findOne({email : info.email , password : info.password});
    if (user) {
        
        return user;
    }

    return false;
}

let FindUser = async (info) => {
    let user = await User.findOne({email : info.email , password : info.password});
    if (user) {
        
        return user;
    }

    return false;
}