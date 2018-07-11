const contorller = require('./contorller');
module.exports = (app) => {
    app.route('/').get(
        contorller.home
    );


    app.route('/signup').post(
        contorller.signupUser
    )
    app.route('/signup').get(
        contorller.signupPage
    )

    app.route('/login').post(
        contorller.loginUser       
    )
    app.route('/login').get(
        contorller.loginPage
    )

}