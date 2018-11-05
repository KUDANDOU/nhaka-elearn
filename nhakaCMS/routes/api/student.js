var express = require('express');
var router = express.Router();
var student = require('../../controllers/students');
var auth = require( "../../middleware/authentication");

var LocalStrategy = require('passport-local').Strategy;

/* GET student listing. */
router.get('/', function(req, res, next)
{
    res.send('respond with a resource');
});

router.post('/login', student.login);
router.post('/register', student.register);

router.get('/failurejson', student.failurejson);
router.get('/successjson', student.successjson);

router.post('/forgot', student.forgot);
router.post('/changepassword/:id', student.changepassword);

router.get('/logout', student.logout);
router.get('/index',auth.verifyToken, student.index);

router.post('/enroll',student.enroll);

router.get('/view/:id',auth.verifyToken, student.view);
router.put("/update/:id",auth.verifyToken, student.update);

module.exports = router;


