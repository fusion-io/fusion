const path = require('path');

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

    providers: [
        './Http/HttpServiceProvider',

    ]
};
