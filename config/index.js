const path      = require('path');
const winston   = require('winston');

/**
 * This is the default application configuration. If you switch your environment by setting NODE_ENV environment
 * variable, related environment-based configuration will be merged with this configuration.
 *
 * Please check the config/env.js for environment-based configuration.
 *
 */
module.exports = {

    /**
     * Application environment. By switching the application environment,
     * we'll change the application configuration.
     *
     * Therefore, your application behavior changes.
     *
     */
    env: process.env.NODE_ENV || 'local',

    /**
     * Debugging flag. If this config is set to true, the application will
     * show a pretty debugging UI when the server encounter any un-expected error.
     *
     */
    debug: process.env.APP_DEBUG || false,

    /**
     * The HTTP configuration
     *
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
     * Please refer to the winston document.
     *
     * @link(https://www.npmjs.com/package/winston
     *
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
     *
     */
    providers: [

        /**
         * Fusion services
         */
        '@fusion.io/framework/Logger/LoggerServiceProvider',
        '@fusion.io/framework/Session/SessionsServiceProvider',


        /**
         * Application services
         */
        './Http/HttpServiceProvider',
        './ErrorHandler/ErrorHandlerServiceProvider'
    ]
};
