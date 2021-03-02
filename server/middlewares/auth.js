const { tokenValidation } = require('../helpers/tokenValidation');
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
            throw {msg: `User with id:${decode.id} not found!`}
        })
    } catch (error) {
        if (error.msg) {
            res.status(404).json({msg: error.msg});
        } else {
            res.status(401).json({msg: "Unauthorized, please login"});
        }
    }
};

const authorization = (req, res, next) => {
    let id = +req.params.id
};

module.exports = {authentication}