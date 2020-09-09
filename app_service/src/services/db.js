const Sequelize = require('sequelize');
const pg = require('pg');
const { db } = require('./../config');
const { 
    host, user, password, database 
} = db;

(async () =>{
    try {
        var pool = new pg.Pool({
            user: user,
            host: host,
            password: password,
            database: database
        });
        console.log('Connecting');
        pool.connect(function(err, client, done) { 
            if(err) {
                console.log('Connection error');
                console.error(err);
                return;
            }
            
            client.query('CREATE DATABASE ' + database, function(err) {
                console.log('Database created')
            });
        });
    } catch (err) {
        console.log('Catch ')
        console.error(err);
    }
})();

const sequelize = new Sequelize(database, user, password, {
    host,
    dialect: 'postgres'
});

module.exports = sequelize;