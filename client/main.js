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

    $("#btn-register").on("click", (e) => {
        e.preventDefault();
        $("#login-page").hide();
        $("#register-page").show();
    })

    $("#btn-close-register").on("click", (e) => {
        e.preventDefault();
        $("#login-page").show();
        $("#register-page").hide();
    })

    $("#btn-submit-register").on("click", (e) => {
        e.preventDefault();
        // Masukin func post submit disini
        register();
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
        localStorage.setItem("name", response.name)
        checkToken()
    })
    .fail(err => {
        swal({
            text: err.responseJSON.msg,
            icon: "warning",
            button: "Login",
        });
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
    localStorage.removeItem("name");

    // Google account logout
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

    checkToken();
}

function fetchTodo () {
    $("#user-name").text(`Hi, ${localStorage.name}`);
    $("#present-date").text(` ${new Date().toLocaleString('sv-SE', {dateStyle: 'short'})}`)
    startTime();
    fetchHoliday();

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
                            <div class="col-5 d-flex align-items-center">
                                <small>Due Date: <span id="todo-due-date">${new Date(todo.due_date).toLocaleString('sv-SE', {dateStyle : 'short'})}</span></small>
                            </div>
                            <div class="col-3 d-flex align-items-center">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="status" id="todo-status" ${todo.status ? 'checked' : ''} onclick="setStatus(${todo.id})">
                                    <label class="form-check-label" for="todo-status">
                                    Status
                                    </label>
                                </div>
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

function setStatus (id) {
    let todoStatus;
    
    if ($("#todo-status").is(':checked')) {
        todoStatus = true;

        $.ajax({
            url: url+'todos/'+id,
            method: 'PATCH',
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                status: todoStatus
            }
        })
        .done(response => {
            console.log(response);
            swal({
                title: "Good job!",
                text: "You've done this to-do!",
                icon: "success",
                button: "Continue",
            });
            
            fetchTodo();
        })
        .fail(err => {
            console.log(err);
        })

    } else {
        todoStatus = false;
        
        $.ajax({
            url: url+'todos/'+id,
            method: 'PATCH',
            headers: {
                access_token: localStorage.access_token
            },
            data: {
                status: todoStatus
            }
        })
        .done(response => {
            console.log(response);
            swal({
                title: "Changed your mind?",
                text: "Well, we grant your request to undone the to-do.",
                icon: "success",
                button: "Continue",
            });

            fetchTodo();
        })
        .fail(err => {
            console.log(err);
        })

    }
}

function deleteTodo (id) {
    swal({
        title: "Are you sure?",
        text: "Once to-do deleted, you will not be able to recover this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
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
        
            swal("Your to-do file has been deleted!", {
            icon: "success",
          });
        }
    });
    
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
        let errors = [];

        err.responseJSON.forEach(error => {
            errors.push(error.msg)
        })

        swal({
            text: errors.join('\n'),
            icon: "warning",
            button: "Continue",
        });
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
        fetchTodo();
        $("#edit-todo-page").hide();
        $("#todo-list-section").show();
    })
    .fail(err => {
        let errors = [];

        err.responseJSON.forEach(error => {
            errors.push(error.msg)
        })

        swal({
            text: errors.join('\n'),
            icon: "warning",
            button: "Continue",
        });
    })
}

function register () {
    let first_name = $("#register-first-name").val();
    let last_name = $("#register-last-name").val();
    let email = $("#register-email").val();
    let password = $("#register-password").val();

    $.ajax({
        url: url+'register',
        method: 'POST',
        data: {
            first_name,
            last_name,
            email,
            password
        }
    })
    .done(response => {
        swal({
            title: "Register success!",
            icon: "success",
            button: "Login",
        });
        $("#login-page").show();
        $("#register-page").hide();
    })
    .fail(err => {
        let errors = [];

        err.responseJSON.forEach(error => {
            errors.push(error.msg)
        })

        swal({
            text: errors.join('\n'),
            icon: "warning",
            button: "Continue",
        });
    })
    .always(() => {
        $("#register-first-name").val('');
        $("#register-last-name").val('');
        $("#register-email").val('');
        $("#register-password").val('');
    })

}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        url: url+'google-login',
        method: 'POST',
        data: {
            id_token
        }
    })
    .done(response => {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("name", response.name);
        checkToken();
    })
    .fail(err => {
        console.log(err);
    })
}

function fetchHoliday() {
    $.ajax({
        url: url+'api/holidays',
        method: 'GET',
    })
    .done(response => {
        $("#holiday-container").empty();

        response.forEach(holiday => {
            $("#holiday-container").append(
                `
                <div class="card shadow mb-1 bg-body rounded">
                    <div class="card-body">
                    <p><span style="color: red;">${holiday.date}</span> ::: ${holiday.name}</p>
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

function startTime() {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $("#present-time").text(`${h} : ${m} : ${s}`)
    let t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}