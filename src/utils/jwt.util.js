const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION
        }
    )
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}