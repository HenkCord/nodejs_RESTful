// Server Loader

var express    = require('express'),
    server     = require('./app-server'),
    config     = require('./config'),
    routes     = require('./routes'),
    oauth      = require('./handlers/authStrategy'),
    models     = require('./models'),
    bodyParser = require('body-parser'),
    passport   = require('passport'),
    app,
    init;

// Set the default environment to be `development`
process.env.SERVER_MODE = process.env.SERVER_MODE || 'development';
app = express();

// Initialise
init = {
    start: function () {
        // Load our config.js file from the local file system.
        return config.load().then(function () {

            console.log('Config: LOAD');

        }).then(function () {

            /*Create DB connection*/
            models.load().then(function () {
                console.log('Models: LOAD');
            }).catch(function () {
                console.error('Models: ERROR LOAD');
            });

        }).then(function () {

            //Secure
            app.disable('x-powered-by');
            //Public files
            app.use(express.static(config.get().paths.contentPath));
            // parse application/x-www-form-urlencoded
            app.use(bodyParser.urlencoded({extended: false}));
            // parse application/json
            app.use(bodyParser.json());
            // init passport for auth
            app.use(passport.initialize());
            // oauth strategy
            oauth;
            // Routing
            routes(app);

            // Create new Object
            return new server(app);
        }).then(function (Server) {
            // Start handle our server instance.
            Server.start();
        }).catch(function (err) {
            console.error('core/index.js 36 ' + err);
        });
    }
};

module.exports = init;