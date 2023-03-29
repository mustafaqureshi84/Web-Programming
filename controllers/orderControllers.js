let order = (req, res) => {
    res.send('<h1>User order Page</h1>');
};

let orderHistory = (req, res) => {
    res.send('<h1>User order history Page</h1>');
};

let orderDetails=(req, res)=>{
    res.send('<h1>Admin order Details Page</h1>');
}

module.exports = { order, orderHistory, orderDetails };