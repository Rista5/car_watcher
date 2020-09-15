require('dotenv').config();

const {
    PORT,
    MONGO_HOST,
    MONGO_USER,
    MONGO_PASSWORD,
    RABBITMQ_HOST,
    DB
} = process.env;

const port = PORT || 3000;

module.exports = {
    port: port,
    rabbitmqHost: RABBITMQ_HOST,
    db: {
        host: MONGO_HOST,
        username: MONGO_USER,
        password: MONGO_PASSWORD,
        database: DB
    }
}