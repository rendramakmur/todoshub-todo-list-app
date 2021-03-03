const router = require('express').Router();
const UserController = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');
const todos = require('./todosRoutes');
const API = require('./APIRoutes')

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/api', API)

router.use(authentication)

router.use('/todos', todos)

module.exports = router;