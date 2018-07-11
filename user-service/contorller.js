const amqp = require('amqplib/callback_api');
const uuid = require('uuid/v1');
const BSON = require('bson');
const bson = new BSON();

exports.signupUser = (req,res) => {
        req.checkBody('email','plz enter a valid email address').notEmpty().isEmail();
        req.checkBody('password','plz enter a correct password').notEmpty().isLength({ min: 6 });
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

        amqp.connect('amqp://localhost',(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                const corID = uuid();
                console.log(req.body);
                let text = bson.serialize({type : 'signup',data : req.body},undefined,true);
                channel.consume(q.queue,(msg) => {
                    console.log('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    res.render('login.ejs',{message : result.message , type : 'success'});
                },{noAck : true});
                channel.sendToQueue('rpc_q',new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close(); },500)
            });
        })
    })
}

exports.loginUser = (req,res) => {
    req.checkBody('email','plz enter a valid email address').notEmpty().isEmail();
    req.checkBody('password','plz enter a correct password').notEmpty().isLength({ min: 6 });
    
    let errors = req.validationErrors();

    if(errors) {
        let msg = [];
        errors.map((val,index) => {
            msg.push(val.msg)
        });
        res.render('login.ejs',{ message : msg , type : 'error'});
        return ;
    }
    amqp.connect('amqp://localhost',(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                const corID = uuid();
                let text = bson.serialize({type : 'login',data : req.body},undefined,true);
                channel.consume(q.queue,(msg) => {
                    console.log('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    if(result.status == 'error') {
                        res.render('login.ejs', { message : result.message , type : result.status });
                    } else {
                        res.render('profile.ejs',{ message : result.message , type : result.status , user : result.user });
                    }
                },{noAck : true});
                channel.sendToQueue('rpc_q',new Buffer(text),{correlationId : corID , replyTo : q.queue});
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
