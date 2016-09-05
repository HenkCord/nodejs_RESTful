var IndexController = require('../controllers').IndexController,
    RoutesV1          = require('./RoutesV1'),
    Response        = require('../utils/ResponseJSON'),
    oauth2          = require('../handlers/oauth2');

/*
 OAUTH2

 authorization
 http POST http://localhost:3000/auth grant_type=password client_id=1 client_secret=123 username=leo240532@yandex.ru password=123456

 authorization refresh token
 http POST http://localhost:3000/auth grant_type=refresh_token client_id=1 client_secret=123 refresh_token=TOKEN

 authenticate user
 http GET http://localhost:3000/users/profile Authorization:'Bearer TOKEN'

 */

module.exports = function (app) {
    app.get('/', IndexController.main);
    app.use('/v1', RoutesV1);
};