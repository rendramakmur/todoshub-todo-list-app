const { comparePassword } = require("../helpers/password-helper");
const { generateToken } = require("../helpers/tokenValidation");
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library');

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

                    res.status(200).json({access_token, name: data.getFullName()})
                } else {
                    next ({code: 400, msg: "Email/password invalid"})
                }
            }
        })
        .catch(err => {
            next(err);
        })
    }


    static googleLogin (req, res, next) {
        let googleToken = req.body.id_token
        const client = new OAuth2Client(process.env.GOOGLE_CID);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: googleToken
            });
            const payload = ticket.getPayload();
            let first_name = payload.given_name;
            let last_name = payload.family_name;
            let email = payload.email;
            let password = new Date().toLocaleString('se-SV', {dateStyle: 'short'});

            // console.log(first_name, last_name, email, password);

            User.findOrCreate({
                where: {
                    email,
                },
                defaults: {
                    first_name,
                    last_name,
                    email,
                    password
                }
            })
            .then(data => {
                let access_token = generateToken(data[0].id, data[0].email, process.env.JWT_SECRET);

                res.status(200).json({access_token, name: data[0].getFullName()})
            })
            .catch(err => {
                console.log(err);
                next(err);
            })

          }
        verify().catch(console.error);
    }
}

module.exports = UserController;