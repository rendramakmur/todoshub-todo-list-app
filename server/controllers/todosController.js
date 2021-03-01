const { Todo } = require('../models')

class TodosController {
    static showAllTodos (req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err.message);
        })
    }

    static createTodo (req, res) {
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
            // UserId belum digenerate
        }

        Todo.create(newTodo)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            let errors = [];
            err.errors.forEach(error => {
                errors.push({msg: error.message})
            })
            
            if(errors) {
                res.status(400).json(errors)
            } else {
                res.status(500).json(err.message)
            }
        })
    }

    static getSpesificTodo (req, res) {
        let id = req.params.id

        Todo.findByPk(id)
        .then(data => {
            if (!data) {
                throw {msg: `To-do with id:${id} not found!`}
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            if (err.msg) {
                res.status(404).json({msg: err.msg})
            } else {
                res.status(500).json(err.message)
            }
        })
    }

    static editSpesificTodo (req, res) {
        let id = req.params.id
        let updatedTodo = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            status: req.body.status
            //UserId belum
        }

        console.log(updatedTodo);

        Todo.update(updatedTodo, {
            where: {
                "id": id
            }
        })
        .then(data => {
            if (!data[0]) {
                throw {msg: `To-do with id:${id} not found!`}
            } else {
                return Todo.findByPk(id);
            }
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            if (err.msg) {
                res.status(404).json({msg: err.msg});
            } else {
                let errors = []
                err.errors.forEach(error => {
                    errors.push({msg: error.message})
                })
    
                if (errors) {
                    res.status(400).json(errors);
                } else {
                    res.status(500).json(err.message);
                }
            }

        })
    }

    static changeTodoStatus (req, res) {
        let id = req.params.id
        let newStatus = {
            status: req.body.status
        };

        Todo.update(newStatus, {
            where: {
                "id": id
            }
        })
        .then(data => {
            if (!data[0]) {
                throw {msg: `To-do with id:${id} not found!`}
            } else {
                return Todo.findByPk(id);
            }
        })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            if (err.msg) {
                res.status(404).json({msg: err.msg})
            } else {
                let errors = [];
                err.errors.forEach(error => {
                    errors.push({msg: error.message})
                })
                
                if (errors) {
                    res.status(400).json(errors)
                } else {
                    res.status(500).json(err.message)
                }
            }
        })
    }

    static deleteTodo (req, res) {
        let id = req.params.id

        Todo.destroy({where: {
            "id": id
        }})
        .then(data => {
            if (!data) {
                throw {msg: `To-do with id:${id} not found!`}
            } else {
                res.status(200).json({msg: 'Todo success to delete'})
            }
        })
        .catch(err => {
            if (err.msg) {
                res.status(404).json({msg: err.msg})
            } else {
                res.status(500).json({msg: err.message})
            }
        })
    }
}

module.exports = TodosController;