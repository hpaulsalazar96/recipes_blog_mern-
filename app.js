const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// modelo
require('./app_api/models/db');

// routes
const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const signupRouter = require('./app_server/routes/signup');
const loginRouter = require('./app_server/routes/login');
const logoutRouter = require('./app_server/routes/logout');
const recipeRouter = require('./app_server/routes/recipes');
const contactRouter = require('./app_server/routes/contact');
const profileRouter = require('./app_server/routes/profile');
const apiRouter = require('./app_api/routes/index')

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/recipes', recipeRouter);
app.use('/contact', contactRouter);
app.use('/profile', profileRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
