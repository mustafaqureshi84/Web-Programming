const { Op, order } = require('../models');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { createError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

let createOrder = asyncWrapper(async (req, res, next) => {
    let { userEmail, productId } = req.body;
    if (!userEmail) {
        throw createError(StatusCodes.BAD_REQUEST, 'User Email is missing');
    }
    if (!productId) {
        throw createError(StatusCodes.BAD_REQUEST, 'Product Id is missing');
    }
    let ordr = await order.create(req.body);
    res.status(StatusCodes.CREATED).json(ordr);
});

const orderDetails = asyncWrapper(async (req, res, next) => {
    let ordr = await order.findOne({ where: { id: Number(req.params.id) } });
    res.status(StatusCodes.OK).json(ordr);
});

let orderHistory = asyncWrapper(async (req, res, next) => {
    let ordr = await order.findAll({
        where: { userEmail: req.params.userEmail }
    });
    res.status(StatusCodes.OK).json({ length: ordr.length, ordr });
});

let getAllOrders = asyncWrapper(async (req, res, next) => {
    let { page, productId, userEmail, status } = req.query;
    if (!page) {
        return next(createError(StatusCodes.BAD_REQUEST, 'url is not correct'));
    }
    let orders = await order.findAll({
        where: {
            productId: productId || { [Op.ne]: null },
            userEmail: userEmail || { [Op.ne]: null },
            status: status || { [Op.ne]: null }
        },
        order: [['createdAt', 'ASC']],
        limit: 5, offset: (Number(page) - 1) * 5
    });
    let count = await order.count();
    res.status(StatusCodes.OK).json({ count, orders });
});

module.exports = { createOrder, orderHistory, orderDetails, getAllOrders };