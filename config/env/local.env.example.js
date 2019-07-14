const winston = require('winston');
const path    = require('path');

/**
 * This is the example of the environment based configuration.
 *
 */

module.exports = {

    /**
     * Turn on the debug flag
     */
    debug: true,

    /**
     * We'll add Console log transport on local environment for debugging.
     */
    logger: {
        transports: [
            new winston.transports.File({ filename: path.resolve(__dirname + '/../../resources/storage/logs/error.log'), level: 'error' }),
            new winston.transports.File({ filename: path.resolve(__dirname + '/../../resources/storage/logs/fusion.log') }),
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    winston.format.simple()
                ), level: 'debug'
            })
        ]
    }
};
