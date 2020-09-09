require('dotenv').config();

const {
    PORT,
    PGHOST,
    PGUSER,
    PGPASSWORD,
    DB
} = process.env;

const port = PORT || 3001;

module.exports = {
    port,
    db: {
      host: PGHOST,
      user: PGUSER,
      password: PGPASSWORD,
      database: DB,
    }
  };