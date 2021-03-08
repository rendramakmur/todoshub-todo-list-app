const { tokenValidation } = require('../helpers/tokenValidation');
const { User, Todo } = require('../models')

const authentication = (req, res, next) => {
    try {
        let decode = tokenValidation(req.headers.access_token)

        User.findByPk(decode.id)
        .then(data => {
            req.currentUser = {id: data.id, email: data.email};
            next()
        })
        .catch(err => {
            next ({
                code: 404,
                msg: `User with id:${decode.id} not found!`
            })
        })
    } catch (error) {
        next ({
            code: 401,
            msg: "Unauthorized, please login."
        })
    }
};

const authorization = (req, res, next) => {
    let id = +req.params.id

    Todo.findByPk(id)
    .then(data => {
        if (data.UserId === req.currentUser.id) {
            next()
        } else {
            next({
                code: 401,
                msg: "Unauthorized content"
            })
        }
    })
    .catch(err => {
        next({
            code: 404,
            msg: `To-do with id:${id} not found!`
        })
    })
};

module.exports = {authentication, authorization}