var mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost:27017/todo-api", { useNewUrlParser: true });

// allows us to use the Promise syntax
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");