const router = require('express').Router();
const todos = require('./todosRoutes');

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.use('/todos', todos)

module.exports = router;