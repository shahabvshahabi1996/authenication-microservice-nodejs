let amqp = require('amqplib/callback_api');
let parseJson = require('parse-json');
let BSON = require('bson');

let controller = require('./controller');
require('./conection');

require('dotenv').config()

let bson = new BSON();

let winston = require('./winston');

amqp.connect(process.env.AMQP_HOST,(err,connection) => {
    connection.createChannel((err,channel) => {
        channel.assertQueue(process.env.AMQP_QUEUE,{durable : false});
        winston.logger.info('listening to queue!!!');
        channel.consume(process.env.AMQP_QUEUE,async (msg) => {
            let res = await Cluster(msg.content);
            winston.logger.info("this is res %s",JSON.stringify(res,undefined,4));
            channel.sendToQueue(msg.properties.replyTo,new Buffer(JSON.stringify(res)),{correlationId : msg.properties.correlationId});
        });
    })
})


let Cluster = async (name) => {

    let parsed = bson.deserialize(name, {
        promoteBuffers: true
    });
    if(parsed.type == 'signup') {
        let res = controller.registerUser(parsed.data);

        if(res) {
            let data = {
                status : 'success',
                message : 'you have successfully signed up!'
            }

            return data;
        }

        else {
            let data = {
                status : 'error',
                message : ['there is an account with that email or username!']
            }

            return data;
        }

    }
    else {
        let res = await controller.findUser(parsed.data);
        winston.logger.debug(res);
        if (res) {
            let data = {
                status : 'success',
                message : 'you have successfully logged in!',
                user : res
            }

            return data;
        }

        else {
            let data = {
                status : 'error',
                message : ['there is no email with that account!']
            }

            return data;
        }
    }
}

