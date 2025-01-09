const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Access token is required');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(401).send('Invalid token');
        //If the token is valid, the decoded user information (payload in the JWT) is attached to the req object as req.user
        req.user = user; // Attach user to request object
        next();
    });
};

module.exports = { authenticate };
