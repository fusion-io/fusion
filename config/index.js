const path      = require('path');
const winston   = require('winston');

module.exports = {

    env: process.env.NODE_ENV || "local",

    /**
     * The HTTP configuration
     */
    http: {
        port: process.env.PORT || 3000,
        static: {
            root: path.resolve(__dirname + '/../public'),
            opts: {

            }
        }
    },

    /**
     * The logger service is actually the winston logger. So if you want to customize the logger
     * Please refer to the winston document: https://www.npmjs.com/package/winston
     */
    logger: {
        level: 'info',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple()
        ),
        defaultMeta: { service: `fusion:${process.env.NODE_ENV || "local"}` },
        transports: [
            new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/error.log'), level: 'error' }),
            new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/fusion.log') })
        ]
    },

    /**
     * List of the service providers used in your application
     * Feel free to add more service provider if needed. It's your choice!
     */
    providers: [

        /**
         * Fusion services
         */
        "@fusion.io/framework/Logger/LoggerServiceProvider",


        /**
         * Application services
         */
        './Http/HttpServiceProvider'
    ]
};
