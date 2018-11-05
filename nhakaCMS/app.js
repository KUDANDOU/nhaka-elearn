var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Strategy = require('passport-facebook').Strategy;
var validator = require('express-validator');
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");

var config = require("./config/config");
var Student = require('./models/student');
var Admin = require('./models/admin');

// ---------------------------------------------------------
// get an instance of the router for api routes
// ---------------------------------------------------------
var apiRoutes = express.Router();

// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
apiRoutes.use(function(req, res, next)
{
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token)
    {
        // verifies secret and checks exp
        jwt.verify(token, config.SECRET, function(err, decoded)
        {
            if (err)
            {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else
                {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
        });

    }
    else
        {
            // if there is no token return an error
            return res.status(403).send({ success: false, message: 'No token provided.'});
        }
});

// ---------------------------------------------------------
// MongoDB database connection
// ---------------------------------------------------------
mongoose.connect("mongodb://localhost:27017/nhakaCMS", { useNewUrlParser: true });

// ---------------------------------------------------------
// routes for the Admin Portal
// ---------------------------------------------------------
var adminRouter = require('./routes/admin/admins');
var teacherRouter = require('./routes/api/teacher');
var  grade = require('./routes/api/grade');
var lesson = require('./routes/api/lesson');

// ---------------------------------------------------------
// routes for the Student Portal
// ---------------------------------------------------------
var student = require('./routes/api/student');
var subject = require('./routes/api/subject');
var video = require('./routes/api/video');

var app = express();
app.use(validator());

var cors = require('cors');
app.use(cors({origin:true,credentials: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var jsonParser = bodyParser.json({limit:1024*1024*20, type:'application/json'});
var urlencodedParser = bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding' });
app.use(jsonParser);
app.use(urlencodedParser);
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/antfarm', adminRouter);


app.use('/', subject);
app.use('/student', student);
app.use('/video', video);
app.use('/grade', grade);
app.use('/lesson', lesson);

// catch 404 and forward to error handler
app.use(function(req, res, next)
{
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next)
{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, function(username, password, done)
    {
        Student.findOne({ email: username }, function (err, user)
        {
            if (err) { return done(null, false); }
            if (!user) { return done(null, false); }

            salt = user.salt;
            var bytes  = CryptoJS.AES.decrypt(user.password, salt);
            var encrypt_password = bytes.toString(CryptoJS.enc.Utf8);

            if(password == encrypt_password)
            {
                return done(null, user);
            }
            else
                {
                    return done(null, false);
                }
        });
    }
));

passport.use(new Strategy({
        clientID: '1039420852866707',
        clientSecret: '478fbbd9e2f6716a4c893be4d69b8a07',
        callbackURL: 'http://localhost:3000/student/facebook/return'
    },
    function(accessToken, refreshToken, profile, cb)
    {
        return cb(null, profile);
    }));

passport.serializeUser(function(user, cb) { cb(null, user.id); });

passport.deserializeUser(function(id, cb)
{
    Student.findById(id, function (err, user)
    {
        if (err)
            { return cb(err); }
        cb(null, user);
    });
});

module.exports = app;
