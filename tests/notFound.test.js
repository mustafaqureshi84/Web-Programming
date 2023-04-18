const path = require('path');
const { StatusCodes } = require('http-status-codes');
const notFound = require('../middlewares/notFound');

describe('notFound', () => {
    test('should return a 404 status code and serve the not found HTML page', () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            sendFile: jest.fn()
        };
        notFound(req, res);
        expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
        expect(res.sendFile).toHaveBeenCalledWith(path.resolve('public/notfound.html'));
    });
});