require ('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
});

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
require('./middlewares/passport')(passport);
const routes = require('./routes/index.js');
const port = process.env.PORT || 8000;

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// routes
app.use('/api/', routes);

// static files
app.use(express.static(__dirname + '/public'));

// server
app.listen(port, function(){
    console.log(process.env.NODE_ENV, 'mode');
    console.log('Server on port', port);
});