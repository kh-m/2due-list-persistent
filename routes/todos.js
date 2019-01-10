var express = require("express"),
    router  = express.Router(),
    db      = require("../models");

// GET:/api/todos/
/// displays the todos in MongoDB
router.get("/", function(req, res) {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
});

// POST:/api/todos/
/// adds new item to todos
router.post("/", function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        // .status(201) just means that something was created; just to be more explicit
       res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
});

// GET:/api/todos/:todoId
/// displays a specified todo item
router.get('/:todoId', function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
});

// PUT:/api/todos/:todoId
/// updates a todo item
router.put('/:todoId', function(req, res) {
    // tells mongoose to find an 'item' by _id with the :todoId in route (params),
    // then update it with contents of req.body
    // {new: true} tells mongoose to return the new value (rather than default old one) to .then
    db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo);
    })
    .catch(function(err) {
        res.send(err);
    })
});

// DELETE:/api/todos/:todoId
/// deletes a given todo item
router.delete('/:todoId', function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.json({message: 'We deleted it!'});
    })
    .catch(function(err) {
        res.send(err);
    })
});

module.exports = router;