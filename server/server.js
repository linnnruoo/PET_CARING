const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
require('./config/passport');

const indexRouter = require('./routes');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Http requests to /
app.use('/', indexRouter);

// Http requests to /api
// Example: /api/
app.use('/api', apiRouter);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => { 
      res.sendFile(path.resolve(__dirname, 'client', 'build/index.html'));
  });
}


module.exports = app;
