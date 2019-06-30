const winston = require('winston');
const path    = require('path');

module.exports = {
    local: {
        // Your local configuration here
        logger: {
            transports: [
                new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/error.log'), level: 'error' }),
                new winston.transports.File({ filename: path.resolve(__dirname + '/../storage/logs/fusion.log') }),
                new winston.transports.Console({ format: winston.format.simple() })
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
