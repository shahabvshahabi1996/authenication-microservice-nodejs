let contorller = require('./contorller');
module.exports = (app) => {
    
    app.route('/').get(
        contorller.home
    );

    app.route('/signup').post(
        contorller.verifySignUpInfo,
        contorller.makingHashFromPassword,
        contorller.signupUser
    )
    app.route('/signup').get(
        contorller.signupPage
    )

    app.route('/login').post(
        contorller.verifyLoginInfo,
        contorller.makingHashFromPassword,
        contorller.loginUser       
    )
    app.route('/login').get(
        contorller.loginPage
    )

    // test routes
    app.route('/login.json').post(
        contorller.verifyLoginInfoJSON,
        contorller.makingHashFromPassword,
        contorller.LoginUserJSON
    )

    app.route('/signup.json').post(
        contorller.verifySignUpInfoJSON,
        contorller.makingHashFromPassword,
        contorller.signupUserJSON
    )

}