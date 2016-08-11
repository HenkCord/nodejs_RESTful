// Config

var Promise     = require('bluebird'),
    path        = require('path'),
    url         = require('url'),
    _           = require('lodash'),
    rootPath    = path.resolve(__dirname, '../../'),
    packageInfo = require(path.resolve(rootPath,'package.json'));

function ConfigManager() {
    /**
     * Our internal true representation of our current config object.
     * @private
     * @type {Object}
     */
    this._config = {};
}

/**
 * Allows you to set the config object.
 * @param {Object} config Only accepts an object at the moment.
 */
ConfigManager.prototype.set = function (config) {

    var localPath = '',
        contentPath,
        subDir;

    // Merge passed in config object onto our existing config object.
    // We're using merge here as it doesn't assign `undefined` properties
    // onto our cached config object.  This allows us to only update our
    // local copy with properties that have been explicitly set.
    _.merge(this._config, config);

    // Protect against accessing a non-existant object.
    // This ensures there's always at least a paths object
    // because it's referenced in multiple places.
    this._config.paths = this._config.paths || {};

    // Parse local path location
    if (this._config.url) {
        localPath = url.parse(this._config.url).path;
        // Remove trailing slash
        if (localPath !== '/') {
            localPath = localPath.replace(/\/$/, '');
        }
    }

    subDir = localPath === '/' ? '' : localPath;

    // Allow contentPath to be over-written by passed in config object
    // Otherwise default to default content path location
    contentPath = this._config.paths.contentPath
        ? path.resolve(rootPath, this._config.paths.contentPath)
        : path.resolve(rootPath, 'public');

    _.merge(this._config, {
        version: packageInfo.version,
        paths: {
            rootPath: rootPath,
            corePath: path.resolve(rootPath, 'core/'),
            contentPath: contentPath,
            imagesPath: path.resolve(contentPath, 'images')
        },
        options: {
            tokenLife : 3600
        },
        dirs: {
            subDir: subDir
        },
        maintenance: {},
        theme: {
            // normalise the URL by removing any trailing slash
            url: this._config.url ? this._config.url.replace(/\/$/, '') : '',

            // default timezone
            timezone: 'Etc/UTC'
        },
        uploads: {
            // Used by the upload API to limit uploads to images
            extensions: ['.jpg', '.jpeg', '.gif', '.png', '.svg', '.svgz'],
            contentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
        }
    });

    /**/
    _.extend(this, this._config);
};

/**
 * Allows you to read the config object.
 * @return {Object} The config object.
 */
ConfigManager.prototype.get = function () {
    return this._config;
};


ConfigManager.prototype.load = function () {
    var self = this,
        config;

    return new Promise(function (resolve, reject) {
        try {
            config = require(path.join(rootPath, 'config.js'))[process.env.SERVER_MODE];
            resolve();
        }
        catch (e) {
            reject(e);
        }
    }).then(function () {
            self.set(config);
        });
};

module.exports = new ConfigManager();