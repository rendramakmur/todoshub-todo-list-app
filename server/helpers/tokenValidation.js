const jwt = require('jsonwebtoken')

const tokenValidation = token => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = tokenValidation;