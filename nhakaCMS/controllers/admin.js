var Admin = require('../models/admin');
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
                successRedirect: '/antfarm/successjson?email='+req.body.email,
                failureRedirect: '/antfarm/failurejson',
                failureFlash: false
            })(req, res);
        }
};

exports.register = function(req, res, next)
{
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("firstname", "First name is a required field.").notEmpty();
    req.checkBody("lastname", "Last name is a required field.").notEmpty();
    req.checkBody("gender", "Gender is a required field.").notEmpty();
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
            var salt = randomString();
            var ciphertext = CryptoJS.AES.encrypt(req.body.password, salt);
            var encrypt_password = ciphertext.toString();
            var now = new Date();

            var admincreate = new Admin({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encrypt_password,
                gender: req.body.gender,
                salt: salt,
                verified: 1,
                createdAt: now,
                isActive: 1
            });

            admincreate.save(function(err,admin)
            {
                if (err)
                {
                    res.statusCode = 401;
                    //console.log(err.message,'=======>');
                    return res.json({"status": "failure", "statusCode": 401, "message": 'Email already registered', "result": []});
                }
                else
                    {
                        mail.welcomeRegisterEmail(admin);
                        res.statusCode = 200;
                        return res.json({"status": "success", "statusCode": 200, "message": "Admin created successfully", "result": admin});
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
    Admin.findOne(
        { email: email },
        { password: 0, __v: 0 },
        function(err, admin)
        {
            if (err)
            {
                res.send(err);
            }
            else if(admin.isActive == false)
            {
                res.statusCode = 401;
                res.json({"status": "success", "statusCode": 401, "message": "Account is deactivated", "result": []});
            }
            else
                {
                    //How long should the token last in minutes
                    var token = jwt.sign({ name: admin.firstname, email: admin.email }, config.SECRET, { expiresIn: 14320 });

                    res.statusCode = 200;
                    res.json({"status": "success", "statusCode": 200, "message": "Login Successfully", "result": admin,"token": token});
                    res.render('pages/dashboard');
                }
        });
};

//api forgot password
exports.forgot = function(req, res, next)
{
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
    else
        {
            Admin.findOne({email: req.body.email }, function(err, admin)
            {
                if (err) return next(err);
                if (!admin)
                {
                    res.statusCode = 301;
                    return res.json({"status": "failure", "statusCode": 301, "message": "This email id is not registered!", "result": []});
                }
                else
                    {
                        mail.sendForgotPasswordLink(admin);
                        res.statusCode = 200;
                        return res.json({"status": "success", "statusCode": 200, "message": "An email for reset password has been sent to your email id!", "result": admin});
                    }
            });
        }
};

//api change password
exports.changepassword = function(req, res, next)
{
    Admin.findById(req.params.id, function(err, admin)
    {
        if (err)
        {
            res.statusCode = 301;
            return res.json({"status": "failure", "statusCode": 301, "message": "Token not Found!", "result": []});
        }
        else if (admin == null)
        {
            res.statusCode = 301;
            return res.json({"status": "failure", "statusCode": 301, "message": "Admin not Found!", "result": []});
        } else if (req.body.npassword != req.body.cpassword)
        {
            res.statusCode = 301;
            return res.json({"status": "failure", "statusCode": 301, "message": "Both password not matched!", "result": []});
        }
        else
            {
                var salt = randomString();
                var ciphertext = CryptoJS.AES.encrypt(req.body.npassword, salt);
                var encrypt_password = ciphertext.toString();

                admin.password = encrypt_password;
                admin.salt = salt;
                admin.save(function(err, result)
                {
                    if (err) return next(err);
                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "Password changed successfully!", "result": result});
                })
            }
    });
};

//list Api of all admins
exports.index = function(req, res, next)
{
    var where = {};
    where["isActive"] = true;

    Admin.find(where,{ email: 1, firstname: 1, _id: 1, lastname: 1, isActive: 1, createdAt: 1 })
        .populate("adminRoles")
        .exec(function(err, admin)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            } else if(admin == null || admin.length == 0)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'Admin not found', "result": []});
            }

            return res.json({"status": "success", "statusCode": 200, "message": "Admin list", "result": admin});
        });
};

exports.delete = function(req, res, next)
{
    var where = {};
    where["_id"] = require("mongoose").Types.ObjectId(req.params.id);
    Admin.remove(where, function(err, admin)
    {
        if (err)
        {
            res.statusCode = 401;
            return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
        }

        res.statusCode = 200;
        return res.json({"status": "success", "statusCode": 200, "message": "Admin has been deleted successfully!", "result": admin});
    });
};

//view Api of admin
exports.view = function(req, res, next) {
    var where = {};
    where["isActive"] = true;
    where["_id"] = require("mongoose").Types.ObjectId(req.params.id);

    Admin.findById(req.params.id)
        .populate("adminRoles")
        .exec(function(err, admin)
        {
            //console.log("====>",role);
            if (err) {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else if(admin == null || admin.length == 0)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'admin not found', "result": []});
            }

            return res.json({"status": "success", "statusCode": 200, "message": "Admin fetch", "result": admin});
        });
};

//update api of admin
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

        Admin.update(where, { $set: req.body }, {upsert: true}, function(err, admin)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else
                {
                    Admin.findById(req.params.id)
                        .populate("adminRoles")
                        .exec(function(err, admin)
                        {
                            if (err)
                            {
                                res.statusCode = 401;
                                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                            }
                            else if(admin == null || admin.length == 0)
                            {
                                res.statusCode = 401;
                                return res.json({"status": "failure", "statusCode": 401, "message": 'admin not found', "result": []});
                            }

                            return res.json({"status": "success", "statusCode": 200, "message": "Admin has been updated successfully", "result": admin});
                        });
                }
        });
    }
};

//admin create api
exports.create = function(req, res, next) {
    var response = {};
    req.checkBody("email", "Email is a required field").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("firstname", "First name is a required field.").notEmpty();
    req.checkBody("lastname", "Last name is a required field.").notEmpty();
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
            var salt = randomString();
            var ciphertext = CryptoJS.AES.encrypt(req.body.password, salt);
            var encrypt_password = ciphertext.toString();
            var now = new Date();

            var admincreate = new Admin({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: encrypt_password,
                gender: req.body.gender,
                adminRoles: req.body.adminRoles,
                salt: salt,
                verified: 1,
                createdAt: now,
                isActive: 1
            });

            admincreate.save(function(err,admin)
            {
                if (err)
                {
                    res.statusCode = 401;
                    return res.json({"status": "failure", "statusCode": 401, "message": 'Email already registered', "result": []});
                }
                else
                    {
                        mail.welcomeRegisterEmail(admin);
                        res.statusCode = 200;
                        return res.json({"status": "success", "statusCode": 200, "message": "Admin created successfully", "result": admin});
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
