// Import express and express session and morgan for session logging
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const mongoStore = require('connect-mongo')(session);

// Create express app and session object and add it to every request
const app = express();
app.use(session({
    secret: 'bentiu lot ni hoo bende a tiu',
    cookie: {
        maxAge: 6000 // Expire after one minute
    }
}));

// Consume morgan to do logging of session
app.use(morgan('dev'));

// Configure routes to get session details
app.get('/', (req, res, next) => {
    if (req.session.views) { // If the user is already on session
        req.session.views++;
        res.setHeader('Content-Type', 'text/html');
        res.write('<p>views: ' + req.session.views + '</p>');
        res.write('<p>expires in: ' + (req.session.cookie.maxAge / 100) + '</p>');
        res.end();
    } else { // If this is the first time user is visiting
        req.session.views = 1;
        res.end('Welcome to the session demo. refresh!');
    }
});


// Listen at port 3000 
app.listen(3000, () => console.log('Listening on Port 3000'));