"use strict";

const indexRoutes = require("./route");
const scorm_model_1 = require("../models/scorm.model");
const course_user_relation_model_1 = require("../models/course-user-relation.model");
const course_model_1 = require("../models/course.model");

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator)
{
    return new (P || (P = Promise))(function (resolve, reject)
    {
        function fulfilled(value)
        {
            try
            {
                step(generator.next(value));
            }
            catch (e)
            {
                reject(e);
            }
        }

        function rejected(value)
        {
            try
            {
                step(generator["throw"](value));
            }
            catch (e)
            {
                reject(e);
            }
        }

        function step(result)
        {
            result.done ? resolve(result.value) : new P(function (resolve)
                                                        {
                                                            resolve(result.value);
                                                        }).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

Object.defineProperty(exports, "__esModule", { value: true });

class IndexRoute extends indexRoutes.BaseRoute
{
    static create(router)
    {
        console.log("[IndexRoute::create] Creating index route.");

        router.get("/", (req, res, next) =>
        {
            new IndexRoute().index(req, res, next);
        });

        router.post("/initializeLRS/", (req, res, next) =>
        {
            new IndexRoute().initializeLRS(req, res, next).then((data) =>
            {
                return res.status(200).send(data);
            }).catch((e) =>
            {
                return res.status(400).send({ 'status': false });
            });
        });

        router.get('/getParameter/', (req, res, next) =>
        {
            const scorm = new scorm_model_1.Scorm();
            scorm.getDataModelVal(req.query.relation, req.query.param).then((data) =>
            {
                console.log(data);
                return res.status(200).send({
                    'value': data
                });
            }).catch((e) =>
            {
                return res.status(400).send({
                    'status': false
                });
            });
        });

        router.post('/setParameterValue/', (req, res, next) =>
        {
            const scorm = new scorm_model_1.Scorm();
            scorm.setDataModelVal(req.body.relation, req.body.param, req.body.value).then((data) =>
            {
                return res.status(200).send({
                    'status': true
                });
            }).catch((e) =>
            {
                return res.status(400).send({
                    'status': false
                });
            });
        });
    }

    constructor()
    {
        super();
    }

    index(req, res, next)
    {
        this.title = "Home | Nhaka Exercise Platform";
        let options =
            {
                "message": "Welcome to the Nhaka Exercise Platform"
            };
        this.render(req, res, "index", options);
    }

    initializeLRS(req, res, next)
    {
        return __awaiter(this, void 0, void 0, function* ()
        {
            const course = new course_model_1.Course(req.body.courseId);
            const courseData = yield course.load();
            const courseUserRelation = new course_user_relation_model_1.CourseUserRelation();
            let relation = 0;
            const scorm = new scorm_model_1.Scorm();
            try
            {
                relation = yield courseUserRelation.getRelation(req.body.userId, req.body.courseId);
                courseData['intCourseUserRelationId'] = relation;
                console.log('relation = ' + relation);
            }
            catch (e)
            {
                console.log(e);
            }
            yield scorm.init(relation);
            return courseData;
        });
    }

    getScormData(req, res, next)
    {
        return __awaiter(this, void 0, void 0, function* () {});
    }
}
exports.IndexRoute = IndexRoute;
