var UsersController = require('../controllers').UsersController,
    express = require('express'),
    routerV1 = express.Router(),
    Response        = require('../utils/ResponseJSON'),
    config          = require('../config'),
    oauth2          = require('../handlers/oauth2'),
    moment = require('moment');

/*
 OAUTH2

 authorization
 http POST http://localhost:3000/auth grant_type=password client_id=1 client_secret=123 username=leo240532@yandex.ru password=123456

 authorization refresh token
 http POST http://localhost:3000/auth grant_type=refresh_token client_id=1 client_secret=123 refresh_token=TOKEN

 authenticate user
 http GET http://localhost:3000/users/profile Authorization:'Bearer TOKEN'

 */


// middleware that is specific to this router
routerV1.use(function timeLog(req, res, next) {
    console.log('RoutesV1 Time: ' + moment().format("DD.MM.YYYY hh:mm:ss") + ' Url: ' + req.originalUrl);
    next();
});

routerV1.post('/auth', oauth2.authorization);
routerV1.get('/users', UsersController.find);
routerV1.get('/users/id:userId', UsersController.findById);
routerV1.post('/users/registration', UsersController.create);
routerV1.post('/users/update/id:userId', UsersController.updateById);
routerV1.post('/users/remove/id:userId', UsersController.removeById);

routerV1.get('/users/profile', oauth2.authenticate, UsersController.other);

routerV1.get('/config', function (req, res, next) {
    Response.success(res, config);
});


routerV1.get('/api/userInfo', oauth2.authenticate,
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
routerV1.use(function (req, res, next) {
    Response.error(res, 404, null, function () {
        console.error('Not found URL: ' + req.url);
    });
});

routerV1.use(function (err, req, res, next) {
    Response.error(res, err.status || 500, err.message, function () {
        console.error('Internal error(' + res.statusCode + '): ' + err.message + ' (' + req.url + ')');
    });
});

module.exports = routerV1;