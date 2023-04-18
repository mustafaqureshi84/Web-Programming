const { Op, feedback } = require('../models');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { createError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

let createFeedback = asyncWrapper(async (req, res, next) => {
    let { userEmail, productId } = req.body;
    if (!userEmail) {
        throw createError(StatusCodes.BAD_REQUEST, 'User Email is missing');
    }
    if (!productId) {
        throw createError(StatusCodes.BAD_REQUEST, 'Product Id is missing');
    }
    let Feedback = await feedback.create(req.body);
    res.status(StatusCodes.CREATED).json(Feedback);
});

const viewFeedbacks = asyncWrapper(async (req, res, next) => {
    let { page, productId, userEmail } = req.query;
    if (!page) {
        return next(createError(StatusCodes.BAD_REQUEST, 'url is not correct'));
    }
    let feedbacks = await feedback.findAll({
        where: {
            productId: productId || { [Op.ne]: null },
            userEmail: userEmail || { [Op.ne]: null }
        },
        order: [['createdAt', 'ASC']],
        limit: 5, offset: (Number(page) - 1) * 5
    });
    let total = await feedback.count();
    res.status(StatusCodes.OK).json({ count: total, length: feedbacks.length, feedbacks });
});

module.exports = { createFeedback, viewFeedbacks };