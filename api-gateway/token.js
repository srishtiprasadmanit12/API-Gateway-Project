const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtKey  = process.env.JWT_SECRET
console.log("jwtToken--------",jwtKey)
const token = jwt.sign({ id: 1, username: 'testuser' }, jwtKey, { expiresIn: '1h' })
console.log(token)
