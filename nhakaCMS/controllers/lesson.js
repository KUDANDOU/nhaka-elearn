var Lesson = require('../models/lesson');

exports.register = function(req, res, next)
{
    var response = {};
    req.checkBody("topic", "Topic name is a required field.").notEmpty();
    req.checkBody("subTopic", "Sub Topic name is a required field.").notEmpty();
    req.checkBody("lessonTopic", "Lesson Topic name is a required field.").notEmpty();
    req.checkBody("thumbnail", "Thumbnails is a required field.").notEmpty();
    req.checkBody("videoURL", " The video is a required .").notEmpty();
    req.checkBody("exerciseURL", "The exercise is a required.").notEmpty();
    req.checkBody("description", "Lesson description is a required field.").notEmpty();
    //req.checkBody("transcriptURL", "Lesson transcript is a required field.").notEmpty;
    req.checkBody("skillTags", "Skill Tags are a required field.").notEmpty();
    req.checkBody("teacher", "Lesson teacher is a required field.").notEmpty();

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

        var lessonCreate = new Lesson({
            topic: req.body.topic,
            subTopic: req.body.topic,
            thumbnail: req.body.thumbnail,
            videoURL: req.body.videoURL,
            exerciseURL: req.body.exerciseURL,
            description: req.body.description,
            skillTags: req.body.skillTags,
            teacher: req.body.teacher,
            createdAt: now,
        });

        lessonCreate.save(function(err,lesson)
        {
            console.log("Error:"+err);
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": 'lesson already registered', "result": []});
            }
            else
            {
                res.statusCode = 200;
                return res.json({"status": "success", "statusCode": 200, "message": "Lesson created successfully", "result": lesson});
            }
        });
    }
};

//update api of lesson
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

        Lesson.update(where, { $set: req.body }, {upsert: true}, function(err, lesson)
        {
            if (err)
            {
                res.statusCode = 401;
                return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
            }
            else
            {
                Lesson.findById(req.params.id, function(err, lesson)
                {
                    if (err)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": err.message, "result": []});
                    }
                    else if(lesson == null || lesson.length == 0)
                    {
                        res.statusCode = 401;
                        return res.json({"status": "failure", "statusCode": 401, "message": 'lesson not found', "result": []});
                    }

                    res.statusCode = 200;
                    return res.json({"status": "success", "statusCode": 200, "message": "Lesson has been updated successfully", "result": lesson});
                });
            }
        });
    }
};

exports.uploadzip = function(req, res, next)
{
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        console.log(files);

        var extension = path.extname(files.file[0].path);

        if( extension.toLowerCase() == ".zip" ) {
            var id = uuid.v4();

            fs.createReadStream(files.file[0].path).pipe(unzip.Extract({path: 'scorm/packages/' + id}));

            res.json({
                success: true,
                package: id
            });
        } else {
            res.json({
                success: false,
                error: "Incorrect file, the file maybe ZIP"
            });
        }
    });
};
