const mongoose = require('mongoose');
const { db } = require('./../config');
const {
    host, username, password, database 
} = db;

module.exports = () => {
    mongoose.connect(
        `mongodb://${host}`,
        {
            user: username,
            pass: password,
            dbName: database,
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
};