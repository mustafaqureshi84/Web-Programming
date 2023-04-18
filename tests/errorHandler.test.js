const { CustomError } = require('../errors/customError');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const errorHandler = require('../middlewares/errorHandler');

describe('errorHandler middleware', () => {
    const mockReq = {};
    const mockRes = {
        status: jest.fn(() => mockRes),
        json: jest.fn(),
    };
    const mockNext = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should handle CustomError and return an error response', () => {
        const customError = new CustomError(StatusCodes.BAD_REQUEST, 'Invalid input');
        errorHandler(customError, mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
        expect(mockRes.json).toHaveBeenCalledWith({ reasonPhrase: 'Invalid input' });
    });

    test('should handle non-CustomError and return an internal server error response', () => {
        const nonCustomError = new Error('Test error');
        errorHandler(nonCustomError, mockReq, mockRes, mockNext);
        expect(mockRes.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(mockRes.json).toHaveBeenCalledWith({ reasonPhrase: ReasonPhrases.INTERNAL_SERVER_ERROR, err: nonCustomError });
    });
});