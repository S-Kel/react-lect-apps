var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    // let user = {};
    // if (req.user === undefined) console.log("Error: undefined email") //user[email] = 'undefined';
    // else user = req.user;

    const user = req.user;

    console.log(user);
    res.render('index', { title: 'Passport Demo', user: user });
});

module.exports = router;