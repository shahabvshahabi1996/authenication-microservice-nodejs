let assert = require('assert');
let axios = require('axios');
let sinon = require('sinon');
let randomEmail = require('random-email');
// let mongoose = require('mongoose');
let User = require('../db-service/model');

describe('Routes Requests' , () => {

    describe('Login POST Requests' , () => {
        it('should return undefined when there is no connection',() => {
            axios.get('http://loclhost:3000/login.json')
            .then((response) => { 
                assert.equal(response.status,200);
            }).catch(e => {
                assert.equal(e.status,undefined);
            });
        });

        it('should return error when there is no data' , (done) => {
            axios.post('http://localhost:3000/login.json',{
                email : '',
                password : ''
            }).then(response => {
                assert.equal(response.status,200);
                assert.equal(response.data.type,'error');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return false when we send wrong data' , (done) => {
            axios.post('http://localhost:3000/login.json',{
                email : 'mock@test.com',
                password : 'mockpass'
            }).then(response => {
                assert.equal(response.status,200);
                assert.equal(response.data.type,'error');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return true when we send right data',(done) => {
            axios.post('http://localhost:3000/login.json',{
                email : 'shahab@cheshmak.me',
                password : 'shahab1996'
            }).then(response => {
                assert.equal(response.status,200);
                assert.equal(response.data.type,'success');
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

    describe('Signup POST Requests',() => {
        // let count ;
        let data;
        before('connection',() => {
           data = {
                email : randomEmail(),
                password : '123456',
                name : 'mock',
                family : 'mockmanesh',
                username : randomEmail() + randomEmail() 
           }
        });

        it('should save a new user without error', (done) => {
            axios.post('http://localhost:3000/signup.json',data).then(async(response) => {
                assert.equal(response.data.type,'success')
                assert.equal(response.data.message , 'you have successfully signed up!');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return error if we send none to api', (done) => {
            axios.post('http://localhost:3000/signup.json',{}).then(async(response) => {
                assert.equal(response.data.type,'error')
                // assert.equal(response.data.message , 'you have successfully signed up!');
                done();
            }).catch((e) => {
                done(e);
            });
        });

        it('should return error if we send wrong info to API', (done) => {
            axios.post('http://localhost:3000/signup.json',{
                email : '',
                password : '',
                name : '',
                family : "",
                username : ''
            }).then(async(response) => {
                assert.equal(response.data.type,'error')
                // assert.equal(response.data.message , 'you have successfully signed up!');
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

});

describe('mongodb requests' , () => {
    let data;
    before('connection',() => {
        data = {
            email : randomEmail(),
            password : '123456',
            name : 'mock',
            family : 'mockmanesh',
            username : randomEmail() + randomEmail() 
        }
    });

    it('should save a user without any error', (done) => {
        let user = new User(data);

        user.save().then((res) => {
            assert(res);
            done();
        }).catch(e => {
            done(e);
        })         
    });

    it('should find a user without any errors' , (done) => {
        User.findOne({email : data.email , password : data.password}).then((res) => {
            assert(res);
        }).catch(e => {
            done(e);
        });
    })
});