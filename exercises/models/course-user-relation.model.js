"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Promise = require("promise");

const MongoClient = require('mongodb').MongoClient;
const dbconfig = require('../config/db.json');

class CourseUserRelation
{
    constructor() { }

    getRelation(user = 0, course = 0)
    {
        return new Promise((resolve, reject) =>
        {
            MongoClient.connect(dbconfig.host,{ useNewUrlParser: true }, function(err, db)
            {
                if (err) throw err;
                var dbo = db.db(dbconfig.database);

                //SELECT intCourseUserRelationId FROM tblCourseUserRelation WHERE intUserId = ? AND intCourseId = ?`
                dbo.collection("tableCourseUserRelation").find({intUserId: user, intCourseId: course }).toArray(function(err, results)
                {
                    if (err)
                    {
                        console.log('course-user-relation.model', error);
                        throw new Error('There was an error getting relationship');
                    }

                    if (results.length)
                    {
                        resolve(results[0].intCourseUserRelationId);
                    }
                    else
                    {
                        reject({ 'message': 'There are no relation between user and course' });
                    }
                    console.log(results[0]);
                    db.close();
                });
            });
        });
    }
}
exports.CourseUserRelation = CourseUserRelation;
