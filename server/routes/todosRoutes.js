const TodosController = require('../controllers/todosController')
const router = require('express').Router()

router.post('/', TodosController.createTodo)
router.get('/', TodosController.showAllTodos)
router.get('/:id', TodosController.getSpesificTodo)
router.put('/:id', TodosController.editSpesificTodo)
router.patch('/:id', TodosController.changeTodoStatus)
router.delete('/:id', TodosController.deleteTodo)

module.exports = router;