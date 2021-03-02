const TodosController = require('../controllers/todosController')
const { authorization } = require('../middlewares/auth')
const router = require('express').Router()


router.post('/', TodosController.createTodo)
router.get('/', TodosController.showAllTodos)

router.get('/:id', authorization, TodosController.getSpesificTodo)
router.put('/:id', authorization, TodosController.editSpesificTodo)
router.patch('/:id', authorization, TodosController.changeTodoStatus)
router.delete('/:id', authorization, TodosController.deleteTodo)

module.exports = router;