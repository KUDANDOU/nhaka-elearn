var Student = require('../models/student');
var Enrolment = require('../models/enrolment');
var passport = require('passport');
var CryptoJS = require("crypto-js");
var mail = require("../services/mail");
var jwt = require('jsonwebtoken');
var config = require("../config/config");

//login api
exports.login = function(req, res, next)
{
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("password", "Password is a required field.").notEmpty();
    var errors = req.validationErrors();

    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);

    }
    else
        {
            passport.authenticate('local', {
                successRedirect: '/student/successjson?email='+req.body.email,
                failureRedirect: '/student/failurejson',
                failureFlash: false
            })(req, res);
    }
};

exports.register = function(req, res, next)
{
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("fullname", "First name is a required field.").notEmpty();
    //req.checkBody("firstname", "First name is a required field.").notEmpty();
    //req.checkBody("lastname", "Last name is a required field.").notEmpty();
    req.checkBody("gender", "Gender is a required field.").notEmpty();
    req.checkBody("dob", "Date of birth is a required field.").notEmpty();
    req.checkBody("nationality", "Nationality is a required field.").notEmpty();
    req.checkBody("nationalID", "National ID is a required field.").notEmpty();
    req.checkBody("faith", "Faith is a required field.").notEmpty();
    req.checkBody("language", "Language is a required field.").notEmpty();
    req.checkBody("specialneeds", "Special is a required field.").notEmpty();
    req.checkBody("schoolName", "School Name is a required field.").notEmpty();
    req.checkBody("schoolAddress", "School Address is a required field.").notEmpty();
    req.checkBody("grade", "Grade is a required field.").notEmpty();
    req.checkBody("address", "Address is a required field.").notEmpty();
    req.checkBody("suburb", "Suburb is a required field.").notEmpty();
    req.checkBody("city", "City is a required field.").notEmpty();
    req.checkBody("guardian", "Guardian is a required field.").notEmpty();
    req.checkBody("phone", "Phone is a required field.").notEmpty();
    req.checkBody("password"," Password field is required").notEmpty();
    var errors = req.validationErrors();

    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);
    }
    else
        {
            var salt = randomString();
            var ciphertext = CryptoJS.AES.encrypt(req.body.password, salt);
            var encrypt_password = ciphertext.toString();
            var now = new Date();

            var studentcreate = new Student({
                accountId: req.body.accountId,
                fullname: req.body.fullname,
                //firstname: req.body.firstname,
                //lastname: req.body.lastname,
                username: req.body.username,
                dob: req.body.dob,
                nationality: req.body.nationality,
                nationalID: req.body.nationalID,
                faith: req.body.faith,
                language: req.body.language,
                specialneeds: req.body.specialneeds,
                schoolName: req.body.schoolName,
                schoolAddress: req.body.schoolAddress,
                grade: req.body.grade,
                address: req.body.address,
                suburb: req.body.suburb,
                city: req.body.city,
                guardian: req.body.guardian,
                phone: req.body.phone,
                email: req.body.email,
                password: encrypt_password,
                gender: req.body.gender,
                salt: salt,
                verified: 1,
                createdAt: now,
                isActive: 0,
            });

            studentcreate.save(function(err,student)
            {
                console.log("Error:"+err);
                if (err)
                {
                    res.statusCode = 401;
                    return res.json({"status": "failure", "statusCode": 401, "message": 'Email already registered', "result": err});
                }
                else
                    {
                        //mail.welcomeRegisterEmail(student);
                        res.statusCode = 200;
                        return res.json({"status": "success", "statusCode": 200, "message": "Student created successfully", "result": student});
                    }
            });
        }
};

exports.failurejson = function(req, res, next)
{
    res.statusCode = 401;
    res.json({"status": "failure", "statusCode": 401, "message": "Invalid Credentials", "result": []});
};

exports.successjson = function(req, res, next)
{
    var email = req.query.email;
    Student.findOne({ email: email }, { password: 0, __v: 0 },
        function(err, student)
        {
            if (err)
            {
                res.send(err);
            }
            else if(student.isActive == false)
            {
                //res.statusCode = 401;
                //res.json({"status": "success", "statusCode": 401, "message": "Account is deactivated", "result": []});

                var token = jwt.sign({ name: student.firstname, email: student.email }, config.SECRET, { expiresIn: 999999 });
                //res.statusCode = 200;
                res.json({"status": "success", "statusCode": 200, "message": "Login Successfull, Account is deactivated", "result": student,"token": token});
            }
            else
                {
                    token = jwt.sign({ name: student.firstname, email: student.email }, config.SECRET, { expiresIn: 999999 });
                    res.statusCode = 200;
                    res.json({"status": "success", "statusCode": 200, "message": "Login Successfully, Account Active", "result": student,"token": token});
                }

        });
};

//api forgot password
exports.forgot = function(req, res, next)
{
    //console.log(req.body,"====>");
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    var errors = req.validationErrors();
    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);
    }
    else {
        Student.findOne({ email: req.body.email }, function(err, student)
        {
            if (err) return next(err);
            if (!student)
            {
                res.statusCode = 301;
                return res.json({"status": "failure", "statusCode": 301, "message": "This email id is not registered!", "result": []});
            }
            else
                {
                    mail.sendForgotPasswordLink(student);
                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "An email for reset password has been sent to your email id!", "result": student});
                }
        });
    }
};

//api change password
exports.changepassword = function(req, res, next)
{
    Student.findById(req.params.id, function(err, student)
    {
        if (err)
        {
            res.statusCode = 301;
            return res.json({"status": "failure", "statusCode": 301, "message": "Token not Found!", "result": []});
        }
        else if (student == null)
        {
            res.statusCode = 301;
            return res.json({"status": "failure", "statusCode": 301, "message": "Student not Found!", "result": []});
        }
        else if (req.body.npassword != req.body.cpassword)
        {
            res.statusCode = 301;
            return res.json({"status": "failure", "statusCode": 301, "message": "Both password not matched!", "result": []});
        }
        else
            {
                var salt = randomString();
                var ciphertext = CryptoJS.AES.encrypt(req.body.npassword, salt);
                var encrypt_password = ciphertext.toString();

                student.password = encrypt_password;
                student.salt = salt;
                student.save(function(err, result)
                {
                    if (err) return next(err);
                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "Password changed successfully!", "result": result});
                })
            }
    });
};

//list Api of all students
exports.index = function(req, res, next)
{
    var where = {};
    where["isActive"] = true;

    Student.find(where,{ email: 1, firstname: 1, _id: 1, lastname: 1, isActive: 1, createdAt: 1 })
        .exec(function(err, student)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else if(student == null || student.length == 0)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'Student not found', "result": []});
            }

            return res.json({"status": "success", "statusCode": 200, "message": "Student list", "result": student});
        });
};

exports.enroll = function(req, res, next)
{
    var response = {};
    req.checkBody("studentToken", "studentToken is a required field").notEmpty();
    var errors = req.validationErrors();

    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);
    }
    else
        {
            console.log("You are now enrolling with id: "+req.body.enrolID);
            var where = {};
            where["isActive"] = true;
            where["_id"] = require("mongoose").Types.ObjectId(req.body.enrolID);

            Student.findById(req.body.enrolID,where)
                .exec(function(err, student)
                {
                    if (err)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                    }
                    else if(student == null || student.length == 0)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": 'student not found', "result": []});
                    }

                    return res.json({"status": "success", "statusCode": 200, "message": "Student fetch", "result": student});
                });
        }
};

//view Api of student
exports.view = function(req, res, next)
{
    var where = {};
    where["isActive"] = true;
    where["_id"] = require("mongoose").Types.ObjectId(req.params.id);

    Student.findById(req.params.id)
        .exec(function(err, student)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else if(student == null || student.length == 0)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'student not found', "result": []});
            }

            return res.json({"status": "success", "statusCode": 200, "message": "Student fetch", "result": student});
        });
};

//update api of student
exports.update = function(req, res, next)
{
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("firstname", "First name is a required field.").notEmpty();
    req.checkBody("lastname", "Last name is a required field.").notEmpty();

    var errors = req.validationErrors();
    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);
    }
    else
        {
            var where = {};
            where["isActive"] = true;
            where["_id"] = require("mongoose").Types.ObjectId(req.params.id);

            Student.update(where, { $set: req.body }, {upsert: true}, function(err, student)
            {
                if (err)
                {
                    res.statusCode = 401;
                    return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                }
                else
                    {
                        Student.findById(req.params.id, function(err, student)
                        {
                            if (err)
                            {
                                res.statusCode = 401;
                                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                            }
                            else if(student == null || student.length == 0)
                            {
                                res.statusCode = 401;
                                return res.json({"status": "failure", "statusCode": 401, "message": 'student not found', "result": []});
                            }

                            res.statusCode = 200;
                            return res.json({"status": "success", "statusCode": 200, "message": "Student has been updated successfully", "result": student});
                        });
                    }
            });
        }
};

//logout api
exports.logout = function(req, res, next)
{
    req.logOut();
    res.statusCode = 200;
    return res.json({"status": "success", "statusCode": 200, "message": "Logout successfully!", "result": []});
};

//core function
function randomString()
{
    var length =15;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++)
    {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
