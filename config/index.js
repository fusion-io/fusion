const path      = require('path');
const winston   = require('winston');

module.exports = {

    env: process.env.NODE_ENV || "local",

    http: {
        port: process.env.PORT || 3000,
        static: {
            root: path.resolve(__dirname + '/../public'),
            opts: {

            }
        }
    },

    logger: {
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service: 'user-service' },
        transports: [
            new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/error.log'), level: 'error' }),
            new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/fusion.log') })
        ]
    },

    providers: [
        "@fusion.io/framework/Logger/LoggerServiceProvider",

        './Http/HttpServiceProvider'
    ]
};
