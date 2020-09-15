require('dotenv').config();

const {
    PORT,
    PGHOST,
    PGUSER,
    PGPASSWORD,
    RABBITMQ_HOST,
    DB
} = process.env;

const port = PORT || 3001;

module.exports = {
    port,
    rabbitmqHost: RABBITMQ_HOST,
    db: {
      host: PGHOST,
      user: PGUSER,
      password: PGPASSWORD,
      database: DB,
    }
  };