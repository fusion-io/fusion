const winston = require('winston');
const path    = require('path');

/**
 * This is the environment based configuration.
 */
module.exports = {

    local: {
        logger: {
            transports: [
                new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/error.log'), level: 'error' }),
                new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/fusion.log') }),

                // We'll add one more log transport on local environment
                new winston.transports.Console({ format: winston.format.cli(), level: 'debug' })
            ]
        }
    },

    production: {
        // Your production configuration here
    },

    testing: {
        // Your test configuration here
    },

    staging: {
        // Your staging configuration here
    }
};
