const jwt = require('jsonwebtoken');
const tokenValidation = require('../helpers/tokenValidation');
const { User } = require('../models')

const authentication = (req, res, next) => {
    try {
        let decode = tokenValidation(req.headers.access_token)
        
        User.findByPk(decode.id)
        .then(data => {
            req.currentUser = {id: data.id, email: data.email};
            next()
        })
        .catch(err => {
            throw new Error()
        })
    } catch (error) {
        res.status(401).json({msg: "Unauthorized, please login"})
    }
};

// const authorization;

module.exports = {authentication}