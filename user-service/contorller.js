let amqp = require('amqplib/callback_api');
let uuid = require('uuid/v1');
let BSON = require('bson');
let bson = new BSON();

require('dotenv').config();

let md5 = require('md5');
let winston = require('./winston');

exports.verifySignUpInfo = (req,res,next) => {
    req.checkBody('email','plz enter a valid email address').isEmail();
    req.checkBody('email','plz enter an email').notEmpty();
    req.checkBody('password','plz enter a password').notEmpty();
    req.checkBody('password','your paletsword must be 6 charecters minimum!').isLength({ min: 6 });
    req.checkBody('name','plz enter a name').notEmpty();
    req.checkBody('family','plz enter a family').notEmpty();
    req.checkBody('username','plz enter a username').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        let msg = [];
        errors.map((val,index) => {
            msg.push(val.msg)
        });
        res.render('signup.ejs',{ message : msg , type : 'error'});        
        return ;
    }

    next();
}

exports.verifyLoginInfo = (req,res,next) => {
    req.checkBody('email','plz enter a valid email address').isEmail();
    req.checkBody('email','plz enter an email').notEmpty();
    req.checkBody('password','plz enter a password').notEmpty();
    req.checkBody('password','your password must be 6 charecters minimum!').isLength({ min: 6 });

    let errors = req.validationErrors();

    if(errors) {
        let msg = [];
        errors.map((val,index) => {
            msg.push(val.msg)
        });
        res.render('login.ejs',{ message : msg , type : 'error'});
        return ;
    }

    next();
}

exports.makingHashFromPassword = (req,res,next) => {
    let hash = md5(req.body.password);
    req.body.password = hash;

    next();
}

exports.signupUser = (req,res) => {    
        amqp.connect(process.env.AMQP_HOST,(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                let corID = uuid();
                winston.logger.debug("this is req body signup %s",req.body);
                let text = bson.serialize({type : 'signup',data : req.body},undefined,true);
                channel.consume(q.queue,(msg) => {
                    winston.logger.info('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    res.render('login.ejs',{message : result.message , type : 'success'});
                },{noAck : true});
                channel.sendToQueue(process.env.AMQP_QUEUE,new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close(); },500)
            });
        })
    })
}

exports.loginUser = (req,res) => {
    amqp.connect(process.env.AMQP_HOST,(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                let corID = uuid();
                let text = bson.serialize({type : 'login',data : req.body},undefined,true);
                channel.consume(q.queue,(msg) => {
                    winston.logger.info('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    if(result.status == 'error') {
                        res.render('login.ejs', { message : result.message , type : result.status });
                    } else {
                        res.render('profile.ejs',{ message : result.message , type : result.status , user : result.user });
                    }
                },{noAck : true});
                channel.sendToQueue(process.env.AMQP_QUEUE,new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close(); },500)
            });
        })
    })
}

exports.home = (req,res) => {
    res.render('index.ejs', {message : 'welcome Home!'});
}

exports.signupPage = (req, res) => {
    res.render('signup.ejs', {message : '' , type : ''});
}

exports.loginPage = (req,res) => {
    res.render('login.ejs', {message : '',type : ''});
}


// tests routes
exports.LoginUserJSON = (req,res) => {
    amqp.connect(process.env.AMQP_HOST,(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                let corID = uuid();
                let text = bson.serialize({type : 'login',data : req.body},undefined,true);
                channel.consume(q.queue,(msg) => {
                    winston.logger.info('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    res.json({
                        message : result.message,
                        type : result.status
                    })
                },{noAck : true});
                channel.sendToQueue(process.env.AMQP_QUEUE,new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close(); },500)
            });
        })
    })
}

exports.signupUserJSON = (req, res) => {
        amqp.connect(process.env.AMQP_HOST,(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                let corID = uuid();
                winston.logger.debug("this is req body signupJSON %s",req.body);
                let text = bson.serialize({type : 'signup',data : req.body},undefined,true);
                channel.consume(q.queue,(msg) => {
                    winston.logger.info('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    res.render({message : result.message , type : 'success'});
                },{noAck : true});
                channel.sendToQueue(process.env.AMQP_QUEUE,new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close(); },500)
            });
        })
    })
} 