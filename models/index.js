var mongoose = require("mongoose");
mongoose.set("debug", true);

var url = process.env.TWODUEMLABDB || "mongodb://localhost:27017/todo-api";

mongoose.connect(url, { useNewUrlParser: true });

// allows use of the Promise syntax
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");