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
    
    // listens to clicks on span of item
    // reason why it's specified on '.list' first is because no spans will be there when page first loads, so have to choose something that exists when the page is loaded i.e. '.list'
    $('.list').on('click', 'span', function() {
        removeTodo($(this).parent());
    })
});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
};

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
    // storing the newTodo an id attribute based off it's MongoDB _id in order to call it by later when deleting
    newTodo.data('id', todo._id);
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

function removeTodo(todo) {
    var clickedId = todo.data('id');
        var deleteUrl = 'api/todos/'+ clickedId;
        // deletes the todo from MongoDB
        $.ajax({
            method: 'DELETE',
            url: deleteUrl
        })
        // deletes the todo from DOM
        .then(function(data) {
            todo.remove();
        })
        .catch(function(err) {
            console.log(err);
        })
}
