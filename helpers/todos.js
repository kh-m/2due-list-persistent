var db = require('../models');

/// displays the todos in MongoDB
exports.getTodos = function (req, res) {
    db.Todo.find()
        .then(function (todos) {
            res.json(todos);
        })
        .catch(function (err) {
            res.send(err);
        })
}

/// adds new item to todos
exports.createTodo = function (req, res) {
    db.Todo.create(req.body)
        .then(function (newTodo) {
            // .status(201) just means that something was created; just to be more explicit
            res.status(201).json(newTodo);
        })
        .catch(function (err) {
            res.send(err);
        })
}

/// displays a specified todo item
exports.getTodo = function (req, res) {
    db.Todo.findById(req.params.todoId)
        .then(function (foundTodo) {
            res.json(foundTodo);
        })
        .catch(function (err) {
            res.send(err);
        })
}

/// updates a todo item
exports.updateTodo = function (req, res) {
    // tells mongoose to find an 'item' by _id with the :todoId in route (params),
    // then update it with contents of req.body
    // {new: true} tells mongoose to return the new value (rather than default old one) to .then
    db.Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })
        .then(function (todo) {
            res.json(todo);
        })
        .catch(function (err) {
            res.send(err);
        })
}

/// deletes a given todo item
exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.json({message: 'We deleted it!'});
    })
    .catch(function(err) {
        res.send(err);
    })
}

module.exports = exports;