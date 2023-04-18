const { cart } = require('../models');
const { StatusCodes } = require('http-status-codes');
const { createError } = require('../errors/customError');
const asyncWrapper = require('../middlewares/asyncWrapper');

let viewCart = asyncWrapper(async (req, res, next) => {
    let products = await cart.findAll();
    res.status(StatusCodes.OK).json(products);
});

let addProductToCart = asyncWrapper(async (req, res, next) => {
    let { userEmail, productId } = req.body;
    if (!userEmail) {
        throw createError(StatusCodes.BAD_REQUEST, 'User Email is missing');
    }
    if (!productId) {
        throw createError(StatusCodes.BAD_REQUEST, 'Product Id is missing');
    }
    let product = await cart.create({ userEmail, productId });
    res.status(StatusCodes.CREATED).json(product);
});

let removeProductToCart = asyncWrapper(async (req, res, next) => {
    if(!req.params.id){
        throw createError(StatusCodes.BAD_REQUEST, 'Id is missing');
    }

    let product = await cart.destroy({ where: { id: Number(req.params.id) } });
    res.status(StatusCodes.OK).json(product);
});

let deleteCart = asyncWrapper(async (req, res, next) => {
    if(!req.params.userEmail){
        throw createError(StatusCodes.BAD_REQUEST, 'User Email is missing');
    }

    let product = await cart.destroy({ where: { userEmail: req.params.userEmail } });
    res.status(StatusCodes.OK).json(product);
});

module.exports = { viewCart, addProductToCart, removeProductToCart, deleteCart };