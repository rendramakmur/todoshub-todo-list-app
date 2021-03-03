const { Todo } = require('../models')

class TodosController {
    static showAllTodos (req, res, next) {
        Todo.findAll({
            where: {
                UserId: currentUser.id
            }
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static createTodo (req, res, next) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.currentUser.id
        }

        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static getSpesificTodo (req, res, next) {
        let id = +req.params.id

        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err);
        })
    }

    static editSpesificTodo (req, res, next) {
        let id = +req.params.id
        let updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            status: req.body.status,
            UserId: req.currentUser.id
        }

        Todo.update(updatedTodo, {
            where: {
                "id": id,
            },
            individualHooks: true,
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1])
        })
        .catch(err => {
            next(err);
        })
    }

    static changeTodoStatus (req, res, next) {
        let id = +req.params.id
        let newStatus = {
            status: req.body.status
        };

        Todo.update(newStatus, {
            where: {
                "id": id
            },
            individualHooks: true,
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1]);
        })
        .catch(err => {
            next(err);
        })
    }

    static deleteTodo (req, res, next) {
        let id = +req.params.id

        Todo.destroy({where: {
            "id": id
        }})
        .then(data => {
            res.status(200).json({msg: 'Todo success to delete'});
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = TodosController;