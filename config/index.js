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
     * The application security keys.
     *
     */
    keys: [process.env.APP_KEY || 'some-secret-key'],

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

        /**
         * We are using the koa-static middleware for serving the static content. Nothing special about it.
         * @see https://github.com/koajs/static
         */
        static: {
            root: path.resolve(__dirname + '/../public'),
            opts: {
                // Other options here
            }
        },

        /**
         * The session service is running with underlying layer is koa-session middleware. Here we can configure that middleware
         *
         * @see https://github.com/koajs/session for more configuration options.
         */
        session: {
            // We ignored autoCommit option, since the framework will handle it by itself
            key: 'fusion:session',
            maxAge: 86400000,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: false,
            renew: false,
        },

        /**
         * Override URL
         */
        url: {
            replace: process.env.HTTP_URL_REPLACE || false,
            pathMap: {
                'HelloWorldController.index': '/people/:name'
            }
        }
    },

    /**
     * The hasher configuration. Now we only supported BCrypt
     *
     */
    hash: {
        rounds: 10
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
        '@fusion.io/framework/Session/SessionServiceProvider',
        '@fusion.io/framework/Hasher/BCryptHasherServiceProvider',


        /**
         * Application services
         */
        './Http/HttpServiceProvider',
        './ErrorHandler/ErrorHandlerServiceProvider'
    ]
};
