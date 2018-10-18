"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const indexRoutes = require("./routes/index");
const fileRoutes = require("./routes/files");
const userRoutes = require("./routes/users");

class Server
{
    static bootstrap()
    {
        return new Server();
    }

    constructor()
    {
        this.app = express();
        this.config();
        this.routes();
        this.api();
    }

    api()
    {

    }

    config()
    {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    routes()
    {
        let router;
        router = express.Router();
        indexRoutes.IndexRoute.create(router);
        fileRoutes.FileRoute.create(router);
        userRoutes.UserRoute.create(router);
        this.app.use(router);
    }
}
exports.Server = Server;
