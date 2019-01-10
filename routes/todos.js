var express = require("express"),
    router  = express.Router(),
    db      = require("../models");

router.get("/", function(req, res) {
    db.Todo.find()
    .then(function(todos){
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
});

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

router.get('/:todoId', function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
});

module.exports = router;