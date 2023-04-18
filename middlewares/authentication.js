const jwt = require('jsonwebtoken');
const { createError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

let authentication = (req, res, next) => {
    let authHeaders = req.headers.authorization;
    if (!authHeaders) {
        throw createError(StatusCodes.UNAUTHORIZED, 'Unauthorized User');
    }
    if (!authHeaders.startsWith('Bearer ')) {
        throw createError(StatusCodes.UNAUTHORIZED, 'Unauthorized User');
    }
    let token = authHeaders.split(' ')[1];
    try {
        let payload = jwt.verify(token, 'gdfthrfy67867thtyr56rfyf7');
        req.user = { name: payload.name, email: payload.email };
    }
    catch (error) {
        throw createError(StatusCodes.UNAUTHORIZED, 'Unauthorized User');
    }
    next();
};

module.exports = authentication;