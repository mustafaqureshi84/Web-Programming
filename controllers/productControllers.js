const { Op, product } = require('../models');
const asyncWrapper = require('../middlewares/asyncWrapper');
const { createError } = require('../errors/customError');
const { StatusCodes } = require('http-status-codes');

const viewProducts = asyncWrapper(async (req, res, next) => {
    let { page, brand, price, sort, sorder, search } = req.query;
    if (!page) {
        return next(createError(StatusCodes.BAD_REQUEST, 'url is not correct'));
    }
    if (price) {
        priceRange = price.split(',');
    }
    if (sort) {
        sortFilter = sort.split(',');
    }
    let products = await product.findAll({
        where: {
            brand: brand || { [Op.ne]: null },
            price: price ? { [Op.gte]: Number(priceRange[0]), [Op.lte]: Number(priceRange[1]) } : { [Op.ne]: null },
            name: search ? { [Op.like]: `%${search}%` } : { [Op.ne]: null }
        },
        order: sort ? sortFilter.map((attri) => [attri, sorder]) : null,
        limit: 5, offset: (Number(page) - 1) * 5
    });
    let total = await product.count();
    res.status(StatusCodes.OK).json({ count: total, length: products.length, products });
});

const getSingleProduct = asyncWrapper(async (req, res, next) => {
    let prod = await product.findOne({ where: { id: Number(req.params.id) } });
    res.status(StatusCodes.OK).json(prod);
});

const addProducts = asyncWrapper(async (req, res, next) => {
    let prod = await product.create(req.body);
    res.status(StatusCodes.CREATED).json(prod);
});

const updateProducts = asyncWrapper(async (req, res, next) => {
    let prod = await product.update(req.body, { where: { id: Number(req.params.id) } });
    res.status(StatusCodes.OK).json(prod);
});

const removeProducts = asyncWrapper(async (req, res, next) => {
    let prod = await product.destroy({ where: { id: Number(req.params.id) } });
    res.status(StatusCodes.OK).json(prod);
});

module.exports = { viewProducts, addProducts, updateProducts, removeProducts, getSingleProduct };