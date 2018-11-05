var express = require('express');
var router = express.Router();
var admin = require('../../controllers/admin');
var auth = require( "../../middleware/authentication");

/* GET admin listing. */
router.get('/', function(req, res, next)
{
    res.render('pages/index', { title: 'Nhaka | Admin Login' });
});

router.get('/dashboard', function(req, res, next)
{
    res.render('pages/dashboard',{ title: 'Nhaka | Admin Dashboard' });
});

router.get('/addlesson', function(req, res, next)
{
    res.render('pages/addlesson',{ title: 'Nhaka | Admin Add Lesson'});
});

router.get('/addgrade', function(req, res, next)
{
    res.render('pages/addgrade');
});

router.get('/addsubject', function(req, res, next)
{
    res.render('pages/addsubject');
});

router.get('/addteacher', function(req, res, next)
{
    res.render('pages/addteacher');
});

router.post('/login', admin.login);
router.post('/register', admin.register);

router.get('/failurejson', admin.failurejson);
router.get('/successjson', admin.successjson);

router.post('/forgot', admin.forgot);
router.post('/changepassword/:id', admin.changepassword);

router.get('/logout', admin.logout);
router.get('/index',auth.verifyToken, admin.index);

router.get('/view/:id',auth.verifyToken, admin.view);
router.put("/update/:id",auth.verifyToken, admin.update);

module.exports = router;
