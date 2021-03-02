function errHandler (err, req, res, next) {
    if (err.name == 'SequelizeValidationError') {
        let errors = []
        err.errors.forEach(error => {
            errors.push({msg: error.message})
        })

        res.status(400).json(errors)
    } else if (err.code === 400) {
        res.status(err.code).json({msg: err.msg})
    } else if (err.code === 404) {
        res.status(err.code).json({msg: err.msg})
    } else if (err.code === 401) {
        res.status(err.code).json({msg: err.msg})
    } else {
        res.status(500).json({msg: err.message})
    }
}

module.exports = errHandler;