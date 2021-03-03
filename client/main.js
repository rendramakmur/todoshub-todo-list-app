let url = 'http://localhost:3000/'

$("document").ready(()=> {
    checkToken();

    $("#btn-login").on("click", (e) => {
        e.preventDefault();
        login();
    });

    $("#btn-logout").on("click", (e) => {
        e.preventDefault();
        logout()
    });

    $("#btn-add-todo").on("click", (e) => {
        e.preventDefault();
        $("#add-todo-page").show();
        $("#todo-list-section").hide();
    })

    $("#btn-close-add").on("click", (e) => {
        e.preventDefault();
        $("#add-todo-page").hide();
        $("#todo-list-section").show();
    })

    $("#btn-edit-todo").on("click", (e) => {
        e.preventDefault();
        $("#edit-todo-page").show();
        $("#todo-list-section").hide();
    });

    $("#btn-close-edit").on("click", (e) => {
        e.preventDefault();
        $("#edit-todo-page").hide();
        $("#todo-list-section").show();
    });

    $("#btn-add").on("click", (e) => {
        e.preventDefault();
        addTodo()
    })
});

function login () {
    const email = $("#login-email").val();
    const password = $("#login-password").val();

    $.ajax({
        url: url+'login',
        method: "POST",
        data: {
            email: email,
            password: password
        }
    })
    .done(response => {
        console.log(response);
        localStorage.setItem("access_token", response.access_token);
        checkToken()
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        $("#login-email").val("");
        $("#login-password").val("");
    })

}

function checkToken () {
    if (localStorage.access_token) {
        $("#navbar").show();
        $("#login-page").hide();
        $("#register-page").hide();
        $("#main-page").show();
        $("#edit-todo-page").hide();
        $("#add-todo-page").hide();
        fetchTodo()
    } else {
        $("#navbar").hide();
        $("#login-page").show();
        $("#register-page").hide();
        $("#main-page").hide();
        $("#edit-todo-page").hide();
        $("#add-todo-page").hide();
    }
}

function logout () {
    localStorage.removeItem("access_token");
    checkToken();
}

function fetchTodo () {
    $("#todo-list").empty();
    $.ajax({
        url: url+'todos',
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        response.forEach(todo => {
            $("#todo-list").append(
                `
                <div class="card col-sm-12 shadow mb-2 bg-body rounded">
                    <div class="card-body">
                        <div class="row">
                            <div class="col">
                                <h5 class="todo-title">${todo.title}</h5>
                            </div>
                            <!-- Tombol Close -->
                            <div class="col d-flex justify-content-end">
                                <a type="button" class="btn-close" aria-label="Close" id="btn-delete-todo" onclick="deleteTodo(${todo.id})"></a>
                            </div>
                        </div>
                        <div id='todo-description'>
                            <p>${todo.description}</p>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col d-flex align-items-center">
                                <small>Due Date: <span id="todo-due-date">${new Date(todo.due_date).toLocaleString('sv-SE', {dateStyle : 'short'})}</span></small>
                            </div>
                            <!-- Tombol Edit -->
                            <div class="col d-flex justify-content-end">
                                <a class="btn" type="button" href="#" id="btn-edit-todo" onclick="getEditTodo('${todo.id}','${todo.title}','${todo.description}','${new Date(todo.due_date).toLocaleString('sv-SE', {dateStyle : 'short'})}')">Edit</a>
                            </div>
                        </div>
                    </div>
                </div>
                `
            )
        })
    })
    .fail(err => {
        console.log(err);
    })
}

function deleteTodo (id) {
    $.ajax({
        url: url+'todos/'+id,
        method: 'DELETE',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(respone => {
        fetchTodo();
    })
    .fail(err => {
        console.log(err);
    })
}

function addTodo () {
    let title = $("#add-todo-title").val();
    let description = $("#add-todo-desc").val();
    let due_date = $("#add-todo-duedate").val();

    $.ajax({
        url: url+'todos/',
        method: 'POST',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title: title,
            description: description,
            due_date: due_date
        }
    })
    .done(response => {
        console.log(response);
        $("#add-todo-page").hide();
        $("#todo-list-section").show();
    })
    .fail(err => {
        console.log(err);
    })
    .always(() => {
        $("#add-todo-title").val("")
        $("#add-todo-desc").val("")
        $("#add-todo-duedate").val("")
        fetchTodo()
    })
}

function getEditTodo(id, todoTitle, todoDesc, todoDueDate) {
    $("#edit-todo-page").show();
    $("#todo-list-section").hide();

    $("#edit-todo-title").val(todoTitle);
    $("#edit-todo-desc").val(todoDesc);
    $("#edit-todo-duedate").val(todoDueDate);

    $("#btn-edit").attr("onclick", `editTodo(${id})`);
}

function editTodo(id) {
    $.ajax({
        url: url+'todos/'+id,
        method: 'PUT',
        headers: {
            access_token: localStorage.access_token
        },
        data: {
            title: $("#edit-todo-title").val(),
            description: $("#edit-todo-desc").val(),
            due_date: $("#edit-todo-duedate").val()
        }
    })
    .done(response => {
        console.log(response);
        fetchTodo();
        $("#edit-todo-page").hide();
        $("#todo-list-section").show();
    })
    .fail(err => {
        console.log(err);
    })
} 