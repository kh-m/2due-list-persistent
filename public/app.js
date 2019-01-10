// a jQuery method that waits until the document has loaded to perform
$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)

    // listens to enter key in input
    $('#todoInput').keypress(function(event) {
        if(event.which == 13) {
            createTodo();
        }
    });
});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
};

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '</li>');
        if(todo.completed) {
            newTodo.addClass("done");
        }
        $('.list').append(newTodo);
}

function createTodo() {
    var userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then(function(newTodo) {
        // clears input field when creating todo
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    })
}