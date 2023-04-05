const { Op, product } = require('../models');

const viewProducts = async (req, res) => {
    let { page, brand, price, sort, sorder, search } = req.query;
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
    res.status(200).json({ length: products.length, products });
};

const addProducts = (req, res) => {
    res.send("Add Products Page");
};

const updateProducts = (req, res) => {
    res.send("Update Products Page");
};

const removeProducts = (req, res) => {
    res.send("Remove Products Page");
};

const getSingleProduct = (req, res) => {
    res.send('<h1>User single Page</h1>');
};

module.exports = { viewProducts, addProducts, updateProducts, removeProducts, getSingleProduct };