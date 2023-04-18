const asyncWrapper = require('../middlewares/asyncWrapper');

describe('asyncWrapper middleware', () => {
    const mockController = jest.fn();

    test('should call the controller function and pass the request, response, and next arguments', async () => {
        const mockReq = {};
        const mockRes = {};
        const mockNext = jest.fn();
        await asyncWrapper(mockController)(mockReq, mockRes, mockNext);

        expect(mockController).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    });

    test('should call the next function with the error argument if the controller function throws an error', async () => {
        const mockError = new Error('Test error');
        mockController.mockRejectedValue(mockError);

        const mockReq = {};
        const mockRes = {};
        const mockNext = jest.fn();
        await asyncWrapper(mockController)(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(mockError);
    });
});