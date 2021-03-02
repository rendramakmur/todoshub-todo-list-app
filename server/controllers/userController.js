const { comparePassword } = require("../helpers/password-helper");
const { User } = require('../models')
const jwt = require('jsonwebtoken')

class UserController {
    static register (req, res) {
        let newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            let errors = [];
            err.errors.forEach(error => {
                errors.push({msg: error.message});
            });

            if (errors) {
                res.status(400).json(errors);
            } else {
                res.status(500).json(err.message);
            }
        })
    }

    static login (req, res) {
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
                throw {msg: "email/password invalid"}
            } else {
                comparedStatus = comparePassword(password, data.password)
                if(comparedStatus) {
                    const access_token = jwt.sign({
                        id: data.id,
                        email: data.email
                    }, process.env.JWT_SECRET);

                    res.status(200).json({id: data.id, email: data.email, access_token})
                } else {
                    throw {msg: "email/password invalid"}
                }
            }
        })
        .catch(err => {
            if (err.msg) {
                res.status(400).json(err)
            } else {
                res.status(500).json(err.message)
            }
        })
    }
}

module.exports = UserController;