const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./services/db')();
require('./consumer')

const app = express();

app.set('port', 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', require('./routes'));

app.listen(app.get('port'));

module.exports = app;