const assert = require('assert');
const axios = require('axios');

describe('LOGIN POST and GET Requests',() => {
    it('should return false error when you send nothing',() => {
        axios.post('http://localhost:3000/login.json',{
            email : '',
            password : ''
        }).then((response) => {
            // console.log(response.data)
            assert.equal(response.data.type , 'error');
        }).catch(e => {
            assert(e);
        })
    })

    it('should return false error when you sending wrong info' , () => {
        axios.post('http://localhost:3000/login.json',{
                email : 'test@test123.com',
                password : '123456'
            }).then((response) => {
                // console.log(response.data)
                assert.equal(response.data.type , 'error');
            }).catch(e => {
                assert(e);
        })  
    })

    it('should return true when you send user email and password info',() => {
        axios.post('http://localhost:3000/login.json',{
                email : 'test@test123.com',
                password : '123456'
        }).then((response) => {
            // console.log(response.data)
            assert.equal(response.data.type , 'success');
        }).catch(e => {
            assert(e);
        })
    })
})

describe('SIGNUP POST and GET Requests',() => {
    it('should return false error when you send nothing',() => {
        axios.post('http://localhost:3000/signup.json',{
            email : '',
            password : '',
            name : '',
            family : '',
            username : ''
        }).then((response) => {
            // console.log(response.data)
            assert.equal(response.data.type , 'error');
        }).catch(e => {
            assert(e);
        })
    })

    it('should return false error when you sending wrong info' , () => {
        axios.post('http://localhost:3000/signup.json',{
                email : 'test123',
                password : '12356',
                name : 'asd',
                family : 'asdasdas',
                username : 'asdsaasd'
            }).then((response) => {
                // console.log(response.data)
                assert.equal(response.data.type , 'error');
            }).catch(e => {
                assert(e);
        })  
    })

    it('should return true when you send right info',() => {
        axios.post('http://localhost:3000/signup.json',{
                email : 'test@test123.com',
                password : '123456',
                name : 'test',
                family : 'test',
                username : 'test@test'
        }).then((response) => {
            // console.log(response.data)
            assert.equal(response.data.type , 'success');
        }).catch(e => {
            assert(e);
        })
    })
})