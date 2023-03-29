
let createFeedback = (req, res) => {
    res.send('<h1>User feedback Page</h1>');
};

let getFeedback = (req, res) => {
    res.send('<h1>Admin feedback Page</h1>');
};

module.exports = { createFeedback, getFeedback };