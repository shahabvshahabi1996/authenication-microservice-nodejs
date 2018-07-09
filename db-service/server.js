const express = require('express');
const app = express();
const amqp = require('amqplib/callback_api');
const PORT = 8000 || process.env.PORT;
const parseJson = require('parse-json');

const controller = require('./controller');
require('./conection');

amqp.connect('amqp://localhost',(err,connection) => {
    connection.createChannel((err,channel) => {
        channel.assertQueue('rpc_text',{durable : false});
        console.log('listening to qeue!!!');
        channel.consume('rpc_q',(msg) => {
            // console.log(JSON.parse(msg.content.toString('utf-8')));
            let res = Test(msg.content.toString());
            // let res = controller.registerUser(msg.content.toString());
            channel.sendToQueue(msg.properties.replyTo,new Buffer(res),{correlationId : msg.properties.correlationId});
        });
    })
})


const Test = (name) => {
    // let json = JSON.parse(JSON.stringify(new Object(name)));
    console.log(name);
    return name;
}

