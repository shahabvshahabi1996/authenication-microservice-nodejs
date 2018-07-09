const contorller = require('./contorller');
module.exports = (app) => {
    app.route('/').get((req,res) => {
        res.send('Hello to user-service');
    });

    app.route('/signup').post(
        contorller.signupUser
    )

    app.route('/login').post(
        contorller.loginUser       
    )
}