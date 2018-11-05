var Teacher = require('../models/teacher');

exports.register = function(req, res, next)
{
    var response = {};
    req.checkBody("name", "Last name is a required field.").notEmpty();
    req.checkBody("gender", "Gender is a required field.").notEmpty();
    req.checkBody("nationality", "Nationality is a required field.").notEmpty();
    req.checkBody("dob", "Date of birth should not be empty").notEmpty();
    req.checkBody("language", "Language is a required field.").notEmpty();
    req.checkBody("gradesTaught", "Grade is a required field.").notEmpty();
    var errors = req.validationErrors();

    if(errors)
    {
        res.statusCode = 401;
        response = { "error" : "failure", "message" : errors[0].msg };
        return res.json(response);
    }
    else
    {

        var now = new Date();

        var teacherCreate = new Teacher({
            name: req.body.firstname,
            dob: req.body.dob,
            nationality: req.body.nationality,
            languages: req.body.languages,
            gradesTaught: req.body.gradesTaught,
            gender: req.body.gender,
            verified: 1,
            createdAt: now,
            isActive: 1,
        });

        teacherCreate.save(function(err,teacher)
        {
            console.log("Error:"+err);
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'Email already registered', "result": []});
            }
            else
            {
                res.statusCode = 200;
                return res.json({"status": "success", "statusCode": 200, "message": "Teacher created successfully", "result": teacher});
            }
        });
    }
};

//update api of teacher
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

        Teacher.update(where, { $set: req.body }, {upsert: true}, function(err, teacher)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else
            {
                Teacher.findById(req.params.id, function(err, teacher)
                {
                    if (err)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                    }
                    else if(teacher == null || teacher.length == 0)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": 'teacher not found', "result": []});
                    }

                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "Teacher has been updated successfully", "result": teacher});
                });
            }
        });
    }
};
