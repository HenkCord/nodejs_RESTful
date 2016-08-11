var config  = require('./config');



function Server(app) {
    this.app = app;
    this.httpServer = null;
    this.connections = {};
    this.connectionId = 0;
    // Expose config module for use externally.
    this.config = config;
}

Server.prototype.start = function () {
    var fn  = this,
        app = fn.app;

    fn.httpServer = app.listen(
        config.server.port,
        config.server.host
    );

    fn.httpServer.on('error', function (error) {
        if (error.errno === 'EADDRINUSE') {
            console.error(config.server.port + ' is already in use');
        } else {
            reject(error.errno);
        }
        process.exit(-1);
    });

    fn.httpServer.on('connection', function () {
        console.log('Connection on ' + config.url);
    });

    fn.httpServer.on('listening', function () {
        console.log('Listening on ' + config.server.host + ':' + config.server.port);
    });

};

module.exports = Server;