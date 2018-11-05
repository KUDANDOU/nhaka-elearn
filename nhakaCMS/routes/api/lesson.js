var Lesson = require('../../controllers/lesson');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
    res.send('respond with a lesson resource');
});

router.post('/add/:id', Lesson.register);

router.put('/update/:id', Lesson.update);

module.exports = router;
