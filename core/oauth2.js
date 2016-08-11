var oauth2orize       = require('oauth2orize'),
    passport          = require('passport'),
    crypto            = require('crypto'),
    config            = require('./config'),
    UsersModel        = require('./models').UsersModel,
    AccessTokenModel  = require('./models').AccessTokenModel,
    RefreshTokenModel = require('./models').RefreshTokenModel,
    AuthHelpers       = require('./utils/AuthHelpers');


// create OAuth 2.0 server
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, email, password, scope, done) {

    console.log('oauth2orize.exchange.password');

    UsersModel.findOne({email: email}, function (err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!AuthHelpers.checkPassword(password, user.passwordSalt, user.password)) return done(null, false);

        RefreshTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) return done(err);
        });
        AccessTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
            if (err) return done(err);
        });

        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');

        RefreshTokenModel.create({
            token: refreshTokenValue,
            clientId: client.clientId,
            userId: user.userId
        }, function (err) {
            if (err) return done(err);
        });

        AccessTokenModel.create({
            token: tokenValue,
            clientId: client.clientId,
            userId: user.userId
        }, function (err, token) {
            if (err) return done(err);
            done(null, tokenValue, refreshTokenValue, {'expires_in': config.get().options.tokenLife});
        });
    });
}));


// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {

    console.log('oauth2orize.exchange.refreshToken');

    RefreshTokenModel.findOne({token: refreshToken}, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        UsersModel.findOne({userId: token.userId}, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }

            RefreshTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
                if (err) return done(err);
            });
            AccessTokenModel.removeOne({userId: user.userId, clientId: client.clientId}, function (err) {
                if (err) return done(err);
            });

            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');

            RefreshTokenModel.create({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user.userId
            }, function (err) {
                if (err) return done(err);
            });

            var info = {scope: '*'};

            AccessTokenModel.create({
                token: tokenValue,
                clientId: client.clientId,
                userId: user.userId
            }, function (err, token) {
                if (err) return done(err);
                done(null, tokenValue, refreshTokenValue, {'expires_in': config.get().options.tokenLife});
            });
        });
    });
}));


// token endpoint
exports.authorize = [
    passport.authenticate(['basic', 'oauth2-client-password'], {session: false}),
    server.token(),
    server.errorHandler()
];

// check token
exports.authenticate = [
    passport.authenticate('bearer', {session: false})
];