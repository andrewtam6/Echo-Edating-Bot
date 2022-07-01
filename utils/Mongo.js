const mongoose = require('mongoose');
require('dotenv').config()
const connectionURL = process.env.DB_URL;

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        mongoose.connect(connectionURL, dbOptions);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () => {
            console.log('Database has successfully connected.')
        })
        mongoose.connection.on('err', err => {
            console.error(`Database error: \n${err.stack}`);

        })
        mongoose.connection.on('disconnected', () => {
            console.warn('Database connection lost');
        });
    }
}