// jQuery method that runs after page has loaded
$(document).ready(function () {
    $.getJSON("/api/todos")
        .then(addTodos)

    // Listens to enter key in input
    $('#todoInput').keypress(function (event) {
        if (event.which == 13) {
            createTodo();
        }
    });

    // Listens to clicks on span of item
    // reason why it's specified on '.list' first is because no spans will be there when page first loads, so have to choose something that exists when the page is loaded i.e. '.list'
    $('.list').on('click', 'span', function (e) {
        // will stop the event from ('bubbling') also triggering the parent '.list' li
        e.stopPropagation();
        removeTodo($(this).parent());
    });

    $('.list').on('click', 'li', function () {
        updateTodo($(this));
    });
});

// Adds ALL todos to DOM list in li
function addTodos(todos) {
    todos.forEach(function (todo) {
        addTodo(todo);
    });
};

// adds a todo to the DOM list in li
function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
    // storing the newTodo an id attribute based off it's MongoDB _id in order to call it by later when deleting
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

// creates a new todo to DB and adds it to DOM
function createTodo() {
    var userInput = $('#todoInput').val();
    $.post('/api/todos', { name: userInput })
        .then(function (newTodo) {
            // clears input field when creating todo
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(function (err) {
            console.log(err);
        })
}

// removes a todo from DB and removes it from DOM
function removeTodo(todo) {
    var clickedId = todo.data('id');
    var deleteUrl = 'api/todos/' + clickedId;
    // deletes the todo from MongoDB
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
        // deletes the todo from DOM
        .then(function (data) {
            todo.remove();
        })
        .catch(function (err) {
            console.log(err);
        })
}

// updates a todo (by marking it as complete/not complete) in DB and DOM
function updateTodo(todo) {
    var updateUrl = 'api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = { completed: isDone }

    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
        .then(function (updatedTodo) {
            todo.toggleClass("done");
            todo.data('completed', isDone);
        })
}
