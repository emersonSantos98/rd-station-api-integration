

class AppError extends Error {
    constructor(message, statusCode = 400, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

class AppErrorRDStation extends Error {
    constructor(message, statusCode = 400, data = null) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

module.exports = {
AppError,
    AppErrorRDStation
};

