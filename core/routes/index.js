var UsersController = require('../controllers').UsersController,
    Response        = require('../utils/ResponseJSON'),
    passport        = require('passport'),
    config          = require('../config'),
    oauth2          = require('../oauth2');

module.exports = function (app) {

    app.get('/', function (req, res, next) {
        res.status(200).json({
            response: {users: 'list'}
        });
    });

    app.get('/users', UsersController.find);
    app.get('/users/id:userId', UsersController.findById);
    app.post('/users/registration', UsersController.create);
    app.post('/users/update/id:userId', UsersController.updateById);
    app.post('/users/remove/id:userId', UsersController.removeById);
    app.post('/users/info', oauth2.authenticate, UsersController.other);

    app.get('/config', function (req, res, next) {
        Response.success(res, config);
    });

    app.post('/oauth', oauth2.authorize);

    app.get('/api/userInfo', passport.authenticate('bearer', {session: false}),
        function (req, res) {
            // req.authInfo is set using the `info` argument supplied by
            // `BearerStrategy`.  It is typically used to indicate scope of the token,
            // and used in access control checks.  For illustrative purposes, this
            // example simply returns the scope in the response.
            Response.success(res, {userId: req.user.userId, email: req.user.email, scope: req.authInfo.scope});
        }
    );
    /*
     app.get('/ErrorExample', function (req, res, next) {
     next(new Error('Random error!'));
     });
     */
    app.use(function (req, res, next) {
        Response.error(res, 404, null, function () {
            console.error('Not found URL: ' + req.url);
        });
    });

    app.use(function (err, req, res, next) {
        Response.error(res, err.status || 500, err.message, function () {
            console.error('Internal error(' + res.statusCode + '): ' + err.message + ' (' + req.url + ')');
        });
    });

};