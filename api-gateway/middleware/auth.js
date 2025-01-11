const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) return res.status(403).send('Access token is required')
    const jwtKey  = process.env.JWT_SECRET
    console.log("jwtToken--------",jwtKey)
    jwt.verify(token,jwtKey , (err, user) => {
        if (err) return res.status(401).send('Invalid token')
        req.user = user // Attach user info to the request
        next()
    })
}

module.exports = { authenticate }
