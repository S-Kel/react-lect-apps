const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const User = require('./models/user');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use static authenicate method of model in LocalStrategy
passport.use(User.createStrategy());

// Use static serialize and deserialize of model for 
// passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Add session support to app
app.use(session({
    name: 'Maat',
    secret: "Bentiu min lot ni hoo ro pahl raar a tiu",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}));

// Initialize Passport and connect it into express pipeline and
// Connect Passport to the session
app.use(passport.initialize());
app.use(passport.session());

// Connect mongoose to DB
const dbConnectUrl = 'mongodb://localhost/express-mongo-passport';
mongoose.connect(dbConnectUrl, { useNewUrlParser: true }, (err) => {
    if (err) console.log('Error connecting to database', err);
    else console.log('Connected to database!');
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

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