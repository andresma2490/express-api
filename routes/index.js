const express = require('express');
const app = express();
const users = require('./api/users.js');

app.use('/users', users);

module.exports = app;