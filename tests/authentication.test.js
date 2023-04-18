require('dotenv').config();
const jwt = require('jsonwebtoken');
const { createError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');
const authentication = require('../middlewares/authentication');

describe('authentication middleware', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            headers: {}
        };
        res = {};
        next = jest.fn();
    });

    test('should throw a 401 error when the Authorization header is missing', () => {
        expect(() => authentication(req, res, next)).toThrow(createError(StatusCodes.UNAUTHORIZED, 'Unauthorized User'));
    });

    test('should throw a 401 error when the Authorization header does not start with Bearer', () => {
        req.headers.authorization = 'InvalidToken';
        expect(() => authentication(req, res, next)).toThrow(createError(StatusCodes.UNAUTHORIZED, 'Unauthorized User'));
    });

    test('should throw a 401 error when the token is invalid', () => {
        req.headers.authorization = 'Bearer InvalidToken';
        jwt.verify = jest.fn(() => { throw new Error(); });
        expect(() => authentication(req, res, next)).toThrow(createError(StatusCodes.UNAUTHORIZED, 'Unauthorized User'));
    });

    test('should set the decoded user object and call next when the token is valid', () => {
        const validToken = jwt.sign({ name: 'Mustafa', email: 'mustafa@test.com' }, 'qwerty75');
        req.headers.authorization = `Bearer ${validToken}`;
        jwt.verify = jest.fn(() => ({ name: 'mustafa', email: 'mustafa@test.com' }));
        authentication(req, res, next);
        expect(req.user).toEqual({ name: 'mustafa', email: 'mustafa@test.com' });
        expect(next).toHaveBeenCalled();
    });
});