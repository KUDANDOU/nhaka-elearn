var Grade = require('../../controllers/grade');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
    res.send('respond with a lesson resource');
});

router.post('/add/:id', Grade.register);

router.put('/update/:id', Grade.update);

module.exports = router;
