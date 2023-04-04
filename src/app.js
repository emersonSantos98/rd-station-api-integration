const express = require('express');
require('express-async-errors');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routers = require('./routes')
const {AppError, AppErrorRDStation} = require("./error/erro");
require('dotenv').config();
class App {
    server;

    constructor() {
        this.server = express()
        this.middlewares()
        this.router()
        this.ErrorMiddleWare()
    }

    middlewares() {
        this.server.use(cors());

        this.server.use(express.json())
        this.server.use(express.urlencoded({
            extended: true
        }))

        this.server.use(helmet());

        if (process.env.NODE_ENV === 'development') {
            this.server.use(morgan('dev'));
        }

    }

    ErrorMiddleWare() {
        this.server.use((error, request, response, next) => {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({
                    status: "error personalizado",
                    ...error
                });
            }

            if (error instanceof AppErrorRDStation) {
                console.log(JSON.stringify(error, null, 2))
                return response.status(error.statusCode).json({
                    status: "error personalizado",
                    ...error
                });
            }


            return response.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error,
            });
        });
    }

    router(){
        this.server.use('/Api/v1/rdStation', routers )
    }
}

module.exports = new App()
