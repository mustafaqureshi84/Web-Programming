class CustomError extends Error {
    constructor(statusCode, reasonPharse) {
        super(reasonPharse);
        this.statusCode = statusCode;
    }
};

let createError = (statusCode, reasonPharse) => {
    return new CustomError(statusCode, reasonPharse)
};

module.exports = { CustomError, createError };