module.exports = {
    // Production
    // Configure your URL and mail settings here
    // *NIX: NODE_ENV=production node app.js
    // Windows SET NODE_ENV=production node app.js
    production: {
        url: 'http://example.com',
        //gzip compression
        compress: false,
        //  mail: {
        //      transport: 'SMTP',
        //      options: {
        //          service: 'Mailgun',
        //          auth: {
        //              user: '', // mailgun username
        //              pass: ''  // mailgun password
        //          }
        //      }
        //  },
        // ```
        mail: {},
        database: {
            client: 'mysql',
            connection: {
                host: '127.0.0.1',
                user: 'root',
                password: '',
                database: 'db_node',
                charset: 'utf8'
            },
            pool: {
                min: 2,
                max: 10
            }
        },
        server: {
            host: '127.0.0.1',
            port: '2368'
        },
        paths: {
            contentPath: __dirname + '/public'
        }
    },
    // Development (default)
    development: {
        url: 'http://localhost:3000',
        compress: false,
        mail: {},
        database: {
            client: 'mysql',
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'db_node',
                charset: 'utf8'
            },
            pool: {
                min: 1,
                max: 10
            }
        },
        server: {
            host: 'localhost',
            port: '3000'
        },
        paths: {
            contentPath: '/public'
        },
        options: {
            tokenLife : 3600
        }
    }
};