const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('./config')
require('./models');
require('./broker');

const app = express();
app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', require('./routes'));

app.listen(app.get('port'));

module.exports = app;