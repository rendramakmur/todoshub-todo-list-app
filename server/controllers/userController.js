const { comparePassword } = require("../helpers/password-helper");
const { generateToken } = require("../helpers/tokenValidation");
const { User } = require('../models')

class UserController {
    static register (req, res, next) {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser, {
            attributes: {
                exclude: ['password']
            }
        })
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err)
        })
    }

    static login (req, res, next) {
        let email = req.body.email
        let password = req.body.password
        let comparedStatus;
        
        User.findOne({
            where: {
                email
            }
        })
        .then(data => {
            if (!data) {
                next ({code: 400, msg: "Email/password invalid"})
            } else {
                comparedStatus = comparePassword(password, data.password)
                if(comparedStatus) {
                    const access_token = generateToken(data.id, data.email, process.env.JWT_SECRET)

                    res.status(200).json({access_token})
                } else {
                    next ({code: 400, msg: "Email/password invalid"})
                }
            }
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = UserController;