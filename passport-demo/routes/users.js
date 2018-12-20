// import { userInfo } from "os";

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

// module.exports = router;

// Import modules
const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const router = express.Router();

/// .post(url, dataObject, callBack)
router.post('/register', (req, res) => {
    /// User.register(new User({}), password, callBack )
    User.register(new User({ email: req.body.email }), req.body.password, err => {
        if (err)
            return res.status(500).send(err.message);

        // Log new user in (Passport will create a session) using the
        // local strategy
        passport.authenticate('local')(req, res, () => {
            // req.user exists at this point
            // Normally we couldn't send back the enture user object - this is for learning purposes
            // Instead, we might send back only the username or email, or event just a status code
            res.json(req.user);
            // res.sendStatus(200);
        });
    });
});

// Login an existing user
router.post('/login', passport.authenticate('local'), (req, res) => {
    // At this point, authenticate was successful and req.user exists

    // Normally we wouldn't send back entire user objects.
    // Instead, we might send back only username, or email or even just status code
    res.json(req.user);
    // res.sendStatus(200);
});

// Logout the current user
router.get('/logout', (req, res) => {
        // req.session.destroy();
        req.logout();
        res.sendStatus(200);
    })
    // Export the router
module.exports = router;