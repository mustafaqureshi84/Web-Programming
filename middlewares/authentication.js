const jwt = require('jsonwebtoken');

let authentication = (req, res, next) => {
    let authHeaders = req.headers.authorization;
    if (!authHeaders.startsWith('Bearer ')) {
        res.send('Unauthorized');
    }
    let token = authHeaders.split(' ')[1];
    try {
        let payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { name: payload.name, email: payload.email };
    }
    catch (error) {
        res.send('Unauthorized');
    }
    next();
};

module.exports = authentication;