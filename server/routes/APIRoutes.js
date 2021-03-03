const APIController = require('../controllers/APIController')
const router = require('express').Router()


router.get('/holidays', APIController.getHolidays)

module.exports = router