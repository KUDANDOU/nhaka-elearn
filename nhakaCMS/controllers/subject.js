var Subject = require('../models/subject');

exports.register = function(req, res, next)
{
    var response = {};
    req.checkBody("name", "Last name is a required field.").notEmpty();
    req.checkBody("thumbnail", "The Subject Thumbnail is a required field.").notEmpty();
    req.checkBody("description", "Subject description should not be empty").notEmpty();
    req.checkBody("previewURL", "The preview video is a required field.").notEmpty();
    req.checkBody("skillTags", "skillTags is a required field.").notEmpty();

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

        var subjectCreate = new Subject({
            name: req.body.firstname,
            thumbnail: req.body.thumbnail,
            description:req.body.description,
            previewURL: req.body.previewURL,
            skillTags: req.body.skillTags,
            createdAt: now,
        });

        subjectCreate.save(function(err,subject)
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
                return res.json({"status": "success", "statusCode": 200, "message": "Subject created successfully", "result": subject});
            }
        });
    }
};

//update api of subject
exports.update = function(req, res, next)
{
    var response = {};
    req.checkBody(" name ", "Subject name is a required field").notEmpty();
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

        Subject.update(where, { $set: req.body }, {upsert: true}, function(err, subject)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else
            {
                Subject.findById(req.params.id, function(err, subject)
                {
                    if (err)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                    }
                    else if(subject == null || subject.length == 0)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": 'subject not found', "result": []});
                    }

                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "Subject has been updated successfully", "result": subject});
                });
            }
        });
    }
};
