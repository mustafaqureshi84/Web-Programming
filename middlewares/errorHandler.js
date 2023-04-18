const { CustomError } = require('../errors/customError');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

let errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ reasonPhrase: err.message });
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ reasonPhrase: ReasonPhrases.INTERNAL_SERVER_ERROR, err });
};

module.exports = errorHandler;