var Teacher = require('../../controllers/teacher');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
    res.send('respond with a lesson resource');
});

router.post('/add/:id', Teacher.register);

router.put('/update/:id', Teacher.update);

module.exports = router;
