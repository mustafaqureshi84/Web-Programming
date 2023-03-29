const viewProducts = (req, res) => {
    res.send("View Products Page");
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