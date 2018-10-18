"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MongoClient = require('mongodb').MongoClient;
const Promise = require("promise");
const dbconfig = require('../config/db.json');

class Scorm
{
    constructor() {}

    init(relationId = 0)
    {
        return new Promise((resolve, reject) =>
        {
            this.checkRelationExist(relationId).then((exists) =>
            {
                if (exists)
                {
                    resolve(true);
                }
                else
                    {
                        MongoClient.connect(dbconfig.host,{ useNewUrlParser: true }, function(err, db)
                        {
                            if (err) throw err;
                            var dbo = db.db(dbconfig.database);

                            //INSERT INTO tblScorm (intCourseUserRelationId, strParameterName, strParameterValue) VALUES
                            dbo.collection("tableScorm").insert([
                                { intScormId: 1 ,intCourseUserRelationId: 1, strParameterName: 'cmi.core._children', strParameterValue: '' },
                                { intScormId: 2 ,intCourseUserRelationId: 1, strParameterName: 'cmi.core.student_id', strParameterValue: '' },
                                { intScormId: 3,intCourseUserRelationId: 1, strParameterName: 'cmi.core.student_name', strParameterValue: '' },
                                { intScormId: 4 ,intCourseUserRelationId: 1, strParameterName: 'cmi.core.lesson_location', strParameterValue: '' },
                                { intScormId: 5 ,intCourseUserRelationId: 1, strParameterName: 'cmi.core.credit', strParameterValue: '' },
                                { intScormId: 6 ,intCourseUserRelationId: 1, strParameterName: 'cmi.core.lesson_status', strParameterValue: 'not attempted' },
                                { intScormId: 7 ,intCourseUserRelationId: 1, strParameterName: 'cmi.core.entry', strParameterValue: '' },
                                { intScormId: 8,intCourseUserRelationId: 1, strParameterName: 'cmi.core.score_children', strParameterValue: '' },
                                { intScormId: 9,intCourseUserRelationId: 1, strParameterName: 'cmi.core.score.raw', strParameterValue: 0},
                                { intScormId: 10,intCourseUserRelationId: 1, strParameterName: 'cmi.core.score.max', strParameterValue: 0},
                                { intScormId: 11,intCourseUserRelationId: 1, strParameterName: 'cmi.core.score.min', strParameterValue: 0},
                                { intScormId: 12,intCourseUserRelationId: 1, strParameterName: 'cmi.core.total_time', strParameterValue: '0000:00:00.00'},
                                { intScormId: 13,intCourseUserRelationId: 1, strParameterName: 'cmi.core.lesson_mode', strParameterValue: 'normal'},
                                { intScormId: 14,intCourseUserRelationId: 1, strParameterName: 'cmi.core.exit', strParameterValue: '' },
                                { intScormId: 15,intCourseUserRelationId: 1, strParameterName: 'cmi.core.session_time', strParameterValue: '0000:00:00.00'},
                                { intScormId: 16,intCourseUserRelationId: 1, strParameterName: 'cmi.suspend_data', strParameterValue: '' },
                                { intScormId: 17,intCourseUserRelationId: 1, strParameterName: 'cmi.launch_data', strParameterValue: '' },
                                { intScormId: 18,intCourseUserRelationId: 1, strParameterName: 'cmi.comments', strParameterValue: '' },
                                { intScormId: 19,intCourseUserRelationId: 1, strParameterName: 'cmi.comments_from_lms', strParameterValue: '' },
                                { intScormId: 20,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives._children', strParameterValue: '' },
                                { intScormId: 21,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives._count', strParameterValue: '' },
                                { intScormId: 22,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives.n.id', strParameterValue: '' },
                                { intScormId: 23,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives.n.score._children', strParameterValue: '' },
                                { intScormId: 24,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives.n.score.raw', strParameterValue: '' },
                                { intScormId: 25,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives.n.score.max', strParameterValue: '' },
                                { intScormId: 26,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives.n.score.min', strParameterValue: '' },
                                { intScormId: 27,intCourseUserRelationId: 1, strParameterName: 'cmi.objectives.n.status', strParameterValue: 'not attempted'},
                                { intScormId: 28,intCourseUserRelationId: 1, strParameterName: 'cmi.student_data._children', strParameterValue: '' },
                                { intScormId: 29,intCourseUserRelationId: 1, strParameterName: 'cmi.student_data.mastery_score', strParameterValue: 0},
                                { intScormId: 30,intCourseUserRelationId: 1, strParameterName: 'cmi.student_data.max_time_allowed', strParameterValue: '0000:00:00.00'},
                                { intScormId: 31,intCourseUserRelationId: 1, strParameterName: 'cmi.student_data.time_limit_action', strParameterValue: 'exit.message'},
                                { intScormId: 32,intCourseUserRelationId: 1, strParameterName: 'cmi.student_preference._children', strParameterValue: '' },
                                { intScormId: 33,intCourseUserRelationId: 1, strParameterName: 'cmi.student_preference.audio', strParameterValue: '' },
                                { intScormId: 34,intCourseUserRelationId: 1, strParameterName: 'cmi.student_preference.language', strParameterValue:'' },
                                { intScormId: 35,intCourseUserRelationId: 1, strParameterName: 'cmi.student_preference.speed', strParameterValue: '' },
                                { intScormId: 36,intCourseUserRelationId: 1, strParameterName: 'cmi.student_preference.text', strParameterValue: '' },
                                { intScormId: 37,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions._children', strParameterValue: '' },
                                { intScormId: 38,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions._count', strParameterValue: 0},
                                { intScormId: 39,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.id', strParameterValue: '' },
                                { intScormId: 40,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.objectives._count', strParameterValue: '' },
                                { intScormId: 41,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.objectives.n.id', strParameterValue: '' },
                                { intScormId: 42,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.time', strParameterValue: '0000:00:00.00'},
                                { intScormId: 43,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.type', strParameterValue: 'choice'},
                                { intScormId: 44,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.correct_responses._count', strParameterValue: 0},
                                { intScormId: 45,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.correct_responses.n.pattern', strParameterValue: '' },
                                { intScormId: 46,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.weighting', strParameterValue: 0},
                                { intScormId: 47,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.student_response', strParameterValue: '' },
                                { intScormId: 48,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.result', strParameterValue: 'neutral'},
                                { intScormId: 49,intCourseUserRelationId: 1, strParameterName: 'cmi.interactions.n.latency', strParameterValue: '' }
                                ], function(err, results)
                            {
                                if (err)
                                {
                                    console.log('scorm.model.init', error);
                                    throw new Error('There is an error initializing data models');
                                }
                                console.log(results);
                                resolve(true);
                                db.close();
                            });
                        });
                    }
            });
        });
    }

    checkRelationExist(relationId = 0)
    {
        return new Promise((resolve, reject) =>
        {
            MongoClient.connect(dbconfig.host,{ useNewUrlParser: true }, function(err, db)
            {
                if (err) throw err;
                var dbo = db.db(dbconfig.database);

                //SELECT intCourseUserRelationId FROM tblScorm WHERE intCourseUserRelationId = ? LIMIT 1
                dbo.collection("tableScorm").find({intCourseUserRelationId: relationId}).toArray(function(err, results)
                {
                    if (err)
                    {
                        console.log('scorm.model.checkRelationsExist', error);
                        throw new Error('cannot check relation');
                    }

                    if (results.length)
                    {
                        resolve(false);
                    }
                    else
                    {
                        resolve(true);
                    }
                    console.log(results[0]);
                    db.close();
                });
            });
        });
    }

    getDataModelVal(relation = 0, param = '')
    {
        return new Promise((resolve) =>
        {
            MongoClient.connect(dbconfig.host,{ useNewUrlParser: true }, function(err, db)
            {
                if (err) throw err;
                var dbo = db.db(dbconfig.database);

                //SELECT strParameterValue FROM tableScorm WHERE strParameterName = ? AND intCourseUserRelationId = ? LIMIT 1`
                dbo.collection("tableScorm").find({strParameterName: param, intCourseUserRelationId: relation }).toArray(function(err, results)
                {
                    if (err)
                    {
                        console.log('scorm.model.getDataModelVal', error);
                        throw new Error('Cannot get data model value with the given parameter ' + param + ' AND relation ' + relation);
                    }

                    resolve(results[0]);
                    console.log(results[0]);
                    db.close();
                });
            });
        });
    }

    setDataModelVal(relation = 0, paramName = '', paramVal = null)
    {
        return new Promise((resolve) =>
        {
            MongoClient.connect(dbconfig.host,{ useNewUrlParser: true }, function(err, db)
            {
                if (err) throw err;
                var dbo = db.db(dbconfig.database);

                //UPDATE tblScorm SET strParameterValue = ? WHERE strParameterName = ? AND intCourseUserRelationId = ?
                dbo.collection("tableScorm").update({strParameterName: paramName, intCourseUserRelationId: relation}, {$set: {strParameterValue: paramVal}}, false, true).toArray(function(err, results)
                {
                    if (err)
                    {
                        console.log('scorm.model.setDataModelVal', error);
                        throw new Error('Cannot set value with the given parameter ' + paramName + ' AND relation ' + relation);
                    }

                    resolve(true);
                    console.log(results);
                    db.close();
                });
            });
        });
    }
}
exports.Scorm = Scorm;
