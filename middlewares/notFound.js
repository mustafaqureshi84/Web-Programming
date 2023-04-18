const path = require('path');
const { StatusCodes } = require('http-status-codes');

let notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).sendFile(path.resolve('public/notfound.html'));
};

module.exports = notFound;