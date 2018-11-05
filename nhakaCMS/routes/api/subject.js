var express = require('express');
var router = express.Router();
var addSubtractDate = require('add-subtract-date');

/* GET home page. */
router.get('/', function(req, res, next)
{
    var now = new Date();
    console.log("The current date is: "+now);

    var expiryDate = addSubtractDate.add(now,30,"days");
    console.log("The subscription expiry date is: "+expiryDate);
    res.render('pages/index', { title: 'Express' });
});

module.exports = router;
