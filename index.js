const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes/index.js');
const port = process.env.PORT || 8000;

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/', routes);

// static files
app.use(express.static(__dirname + '/public'));

// server
app.listen(port, function(){
    console.log('Server on port', port);
});