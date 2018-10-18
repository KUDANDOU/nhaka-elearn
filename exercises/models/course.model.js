"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const MongoClient = require('mongodb').MongoClient;
const dbconfig = require('../config/db.json');
var courseId = 0;
class Course
{
    constructor(id = 0)
    {
        if (id)
        {
            courseId = id;
        }
    }

    load()
    {
        return new Promise((resolve, reject) =>
        {
            MongoClient.connect(dbconfig.host,{ useNewUrlParser: true }, function(err, db)
            {
                if (err) throw err;
                var dbo = db.db(dbconfig.database);
                console.log('This is the Course ID: '+courseId);
                //SELECT * FROM tblScormCourse WHERE intCourseId = ?
                dbo.collection("tableScormCourse").find({intCourseId: parseInt(courseId)}).toArray(function(err, results)
                {
                    if (err)
                    {
                        console.log('course.model.load', error);
                        throw new Error('There was a problem loading data model values');
                    }

                    if (results.length)
                    {
                        resolve(results[0]);
                    }
                    else
                    {
                        reject({ 'message': 'No records found with course id: '});
                    }
                    console.log(results);
                    db.close();
                });
            });
        });
    }

    ID()
    {
        return this.courseId;
    }

    setID(id = 0)
    {
        this.courseId = id;
        return this.courseId;
    }
}
exports.Course = Course;
