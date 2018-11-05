var Grade = require('../models/grade');

exports.register = function(req, res, next)
{
    var response = {};
    req.checkBody("name", "Name is a required field.").notEmpty();
    req.checkBody("description", "Description should not be empty").notEmpty();
    req.checkBody("thumbnail", "Thumbnail is a required field.").notEmpty();
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

        var gradeCreate = new Grade();
        gradeCreate.name = req.body.name;
        gradeCreate.description = req.body.description;
        gradeCreate.thumbnail.data = fs.readFileSync(req.files.thumbnail.path);
        gradeCreate.thumbnail = "image/png";
        gradeCreate.thumbnail.createdAt = now;
        gradeCreate.thumbnail.updatedAt = now;

        gradeCreate.save(function(err,grade)
        {
            console.log("Error:"+err);
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'Grade already registered', "result": []});
            }
            else
            {
                res.statusCode = 200;
                return res.json({"status": "success", "statusCode": 200, "message": "Grade created successfully", "result": grade});
            }
        });
    }
};

//update api of grade
exports.update = function(req, res, next)
{
    var response = {};
    req.checkBody("id", "ID is a required field.").notEmpty();
    req.checkBody("name", "Name is a required field.").notEmpty();
    req.checkBody("description", "Description should not be empty").notEmpty();
    req.checkBody("thumbnail", "Thumbnail is a required field.").notEmpty();
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

        Grade.update(where, { $set: req.body }, {upsert: true}, function(err, grade)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else
            {
                Grade.findById(req.params.id, function(err, grade)
                {
                    if (err)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                    }
                    else if(grade == null || grade.length == 0)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": 'grade not found', "result": []});
                    }

                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "Grade has been updated successfully", "result": grade});
                });
            }
        });
    }
};
