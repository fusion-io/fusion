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
    env: process.env.NODE_ENV,

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
     * The database settings.
     *
     * We build on top of knex. So just use knex setting here
     *
     * @see https://knexjs.org/
     *
     */
    database: {

        /**
         * The default database connection.
         */
        defaultConnection: 'app',

        /**
         * The list of the database connections
         */
        connections: {

            app: {
                client: 'sqlite3',
                useNullAsDefault: true,
                connection: {
                    filename: path.resolve(__dirname + "/../storage/db.sqlite")
                }
            }
        }
    },

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
                // koa-static options
            }
        }
    },

    /**
     * The session service is running with underlying layer is koa-session middleware.
     * Here we can configure that middleware
     *
     * @see https://github.com/koajs/session for more configuration options.
     */
    session: {

        // We supported all of the storage drivers.
        //  now we'll have memory, blackhole, database

        driver: "memory",
        options: {
            key: 'fusion:session',
            maxAge: 86400000
        }
    },

    /**
     * The hasher configuration. Now we only support BCrypt
     *
     */
    hash: {
        rounds: 10
    },

    /**
     * The logger service is actually the winston logger. So if you want to customize the logger,
     * please refer to the winston document.
     *
     * @see https://www.npmjs.com/package/winston
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
     * The storage service configuration.
     * Now we supporting 3 basic drivers: blackhole, memory, database.
     *
     */
    storage: {

        defaultAdapter: process.env.APP_STORAGE || "memory",

        adapters: {
            database: {
                driver: 'database',
                tableName: 'fusion_storages',
                ttl: 86400000,

                // You can specify the database connection
                // that will be used here.

                // connection: "app"
            },

            memory: {
                driver: 'memory'
            }
        }
    },

    /**
     * The Queue configuration. Now we are supporting "database" queue and "sync" queue
     *
     *
     */
    queue: {
        defaultConnection: process.env.QUEUE_CONNECTION || 'sync',

        queues: {
            sync: {
                driver: "sync"
            },
            database: {
                driver: "database",
                tableName: "fusion_jobs",

                // connection: "app"
            }
        }
    },

    view: {
        directory: path.resolve(__dirname + '/../views')
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
        '@fusion.io/framework/Database/DatabaseServiceProvider',
        '@fusion.io/framework/Storage/StorageServiceProvider',
        '@fusion.io/framework/Queue/QueueServiceProvider',
        '@fusion.io/framework/View/ViewServiceProvider',


        /**
         * Application services
         *
         * @important :
         *
         *      Please use the relative path from the 'src/' directory, not
         *      the current configuration file.
         *
         *      And all of the your app service provider must be inside
         *      the 'src' directory.
         *
         *      Ex:
         *          src/MyServiceProvider - wrong
         *          ./MyServiceProvider - correct
         *
         *
         */

        './Http/HttpServiceProvider',
        './ErrorHandler/ErrorHandlerServiceProvider',
        './AppServiceProvider'
    ]
};
