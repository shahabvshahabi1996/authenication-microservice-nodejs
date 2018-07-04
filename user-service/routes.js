module.exports = (app) => {
    app.route('/').get((req,res) => {
        res.send('Hello to user-service');
    })
}