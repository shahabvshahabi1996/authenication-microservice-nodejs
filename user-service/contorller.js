const amqp = require('amqplib/callback_api');
const uuid = require('uuid/v1');

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

            res.json({
                status : 'error',
                message : msg
            });
            return ;
        }

        amqp.connect('amqp://localhost',(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                const corID = uuid();
                let text = JSON.stringify(req.body);
                console.log(text);
                channel.consume(q.queue,(msg) => {
                    console.log('massage recived : %s',msg.content.toString());
                    let result = JSON.parse(msg.content.toString())
                    res.json(result);
                },{noAck : true});
                channel.sendToQueue('rpc_q',new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close() },500)
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

        res.json({
            status : 'error',
            message : msg
        });
        return ;
    }
    amqp.connect('amqp://localhost',(err,connection) => {
        connection.createChannel((err,channel) => {
            channel.assertQueue('',{exclusive : true},(err,q) => {
                const corID = uuid();
                let text = JSON.stringify(req.body);
                channel.consume(q.queue,(msg) => {
                    console.log('massage recived : %s',msg.content.toString());
                },{noAck : true});

                channel.sendToQueue('rpc_q',new Buffer(text),{correlationId : corID , replyTo : q.queue});
                setTimeout(()=>{ connection.close() },500)
            });
        })
    })
}