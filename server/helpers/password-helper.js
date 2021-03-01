const bcrypt = require('bcrypt');

const hashPassword = password => {
    return bcrypt.hashSync(password, 10);
}

const comparePassword = (passwordInput, passwordDB) => {
    return bcrypt.compareSync(passwordInput, passwordDB)
}

module.exports = {hashPassword, comparePassword}