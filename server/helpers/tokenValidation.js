const jwt = require('jsonwebtoken')

const generateToken = (id, email, secret) => {
    return jwt.sign({
        "id": id,
        "email": email,
    }, secret);
}

const tokenValidation = token => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {generateToken, tokenValidation};