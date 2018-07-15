const amqp = require('amqplib/callback_api');
const parseJson = require('parse-json');
const BSON = require('bson');

const controller = require('./controller');
require('./conection');

require('dotenv').config()

const bson = new BSON();

amqp.connect(process.env.AMQP_HOST,(err,connection) => {
    connection.createChannel((err,channel) => {
        channel.assertQueue(process.env.AMQP_QUEUE,{durable : false});
        console.log('listening to qeue!!!');
        channel.consume(process.env.AMQP_QUEUE,async (msg) => {
            let res = await Cluster(msg.content);
            console.log("this is res %s",JSON.stringify(res));
            channel.sendToQueue(msg.properties.replyTo,new Buffer(JSON.stringify(res)),{correlationId : msg.properties.correlationId});
        });
    })
})


const Cluster = async (name) => {

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
        console.log(res);
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

