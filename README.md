# Node Micro-Services Authentication
![nodejs](https://user-images.githubusercontent.com/19559766/42581263-978550aa-8541-11e8-97c6-44e7f4e1b885.png)

this is a microservice built with rabbitmq and nodejs and using with RPC(remote procdural call) method 

# Features 
- [x] using `rabbitmq` server :smirk:
- [x] has two microservices (db-service and user-service) :stuck_out_tongue:
- [x] unit testing with `mochajs`
- [x] fast and easy to work 
- [x] using `ejs` view engine 

# How to run it ??
first you'll need to clone the project and hit `npm install` to install packages THEN :
### 1. Start Rabbitmq Server :
>  For running rabbitmq server just simply tyupe `rabbitmq-server start` and it will start automaticly and to check that go to http://localhost:15672/ and you can see the login page for monitoring!

### 2. Start Server Side (db-service) :
> For starting client side just go to `db-service` directory and then hit the command : `node server` then go to http://localhost:3000

### 3. Start Client Side (user-service) :
> For starting client side just go to `user-service` directory and then hit the command : `node server` 

