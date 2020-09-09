require('dotenv').config();

const {
    PORT,
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
    DB
} = process.env;

const port = PORT || 3000;

module.exports = {
    port: port,
    db: {
        host: MONGO_HOST,
        username: MONGO_USER,
        password: MONGO_PASSWORD,
        database: DB
    }
}