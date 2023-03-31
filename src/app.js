const express = require('express');
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const routers = require('./routes')
const AppError = require("./error/erro");
require('express-async-errors');
require('dotenv').config();
class App {
    server;
    constructor( ) {
        this.server = express()
        this.middlewares()
        this.router()
        this.ErrorMiddleWare()
    }

    middlewares() {
        this.server.use(cors({
            origin: 'https://meusite.com',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));

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
        this.server.use((error, request, response) => {
            if (error instanceof AppError) {
                return response.status(error.statusCode).json({
                    status: "error",
                    message: error.message,
                });
            }

            return response.status(500).json({
                status: "error",
                message: "Internal server error",
                error: error.message,
            });
        });
    }

    router(){
        this.server.use('/Api/v1', routers )
    }
}

module.exports = new App()
