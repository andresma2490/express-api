const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const passportMiddleware = require('./middlewares/passport');
const routes = require('./routes/index.js');
const port = process.env.PORT || 8000;

require('./middlewares/passport');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passport.use('jwt', passportMiddleware);

// routes
app.use('/api/', routes);

// static files
app.use(express.static(__dirname + '/public'));

// server
app.listen(port, function(){
    console.log(process.env.NODE_ENV, 'mode');
    console.log('Server on port', port);
});