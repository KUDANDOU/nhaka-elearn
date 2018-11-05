var Video = require('../../controllers/video');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next)
{
    res.send('respond with a video resource');
});

router.get('/watch/:id', Video.lessonVideo);

router.get('/preview/:id', Video.preview);

module.exports = router;
