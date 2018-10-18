"use strict";

const indexRoutes = require("./route");

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

class FileRoute extends indexRoutes.BaseRoute
{
    static create(router)
    {
        console.log("[FileRoute::create] Creating file upload route.");

        router.get("/upload", (req, res, next) =>
        {
            new FileRoute().file(req, res, next);
        });
    }

    constructor()
    {
        super();
    }

    file(req, res, next)
    {
        this.title = "File Upload | Nhaka Exercise Platform";
        let options =
            {
                "message": "Welcome to the Nhaka Scorm Exercises Upload Page"
            };
        this.render(req, res, "fileupload", options);
    }
}
exports.FileRoute = FileRoute;
