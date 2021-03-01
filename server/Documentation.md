# Fancy To-Do-App Documentation

  Fancy To-Do-App is an app to manage and record what you wanna do.
  
  This API has:
  - RESTful endpoint for CRUD operations.
  - JSON formatted response.

  Tech to build this app:
  - NodeJS
  - Sequelize
  - PostgreSQL
----

<br />

# POST /todos
**The function of this route is to create a new to-do for user.**

* ## URL:

  /todos

* ## Method:

  `POST`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
       "Content-type": "application/json"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
      "title": "<title to get insert into>",
      "description": "<description to get insert into>",
      "due_date": "<due_date to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
        "id": <given id by system>,
        "title": "<posted title>",
        "description": "<posted description>",
        "status": "<posted status>",
        "due_date": "<posted due_date>",
        "createdAt": "2021-02-20T16:08:30.149Z",
        "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** `[
    {
        "msg": "Can not set due date before present time"
    },
    {
        "msg": "Title is required"
    }
]`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:** `{ "msg" : "Internal Server Error" }`

* ## Sample Call:

<br />

# GET /todos
**This route has a main function to show all to-dos from a user.**

* ## URL:

  /todos

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   None

*  ## Request Header

   **Required:**

   ```
   {
       "Content-type": "application/json"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    [
        {
            "id": 1,
            "title": "<todos title>",
            "description": "<todos description>",
            "status": "<todos status>",
            "due_date": "<todos due_date>",
            "createdAt": "2021-02-20T16:08:30.149Z",
            "updatedAt": "2021-02-20T16:08:30.149Z"
        },
        {
            "id": 2,
            "title": "<todos title>",
            "description": "<todos description>",
            "status": "<todos status>",
            "due_date": "<todos due_date>",
            "createdAt": "2021-02-20T16:08:30.149Z",
            "updatedAt": "2021-02-20T16:08:30.149Z"
        }
    ]
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:** `{ msg : "Internal Server Error" }`

* ## Sample Call:

<br />

# GET /todos/:id
**Main function of this route is getting a spesific to-do from a user by to-do id.**

* ## URL:

  /todos/:id

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   "id" = req.params.id

*  ## Request Header

   **Required:**

   ```
   {
       "Content-type": "application/json"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
        "id": 1,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<todos status>",
        "due_date": "<todos due_date>",
        "createdAt": "2021-02-20T16:08:30.149Z",
        "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:

  * **Code:** 404 Not Found <br />
    **Output:** `{ "msg": "To-do with id:3 not found!" }`

* ## Sample Call:

<br />

# PUT /todos/:id
**This route main function is updating all the record of the to-do title, description, status, and due date.**

* ## URL:

  /todos/:id

* ## Method:

  `PUT`

*  ## URL Params

   **Required:**

   "id" = req.params.id

*  ## Request Header

   **Required:**

   ```
   {
       "Content-type": "application/json"
   }
   ```

* ## Request Body

  **Required:**

  ```
  {
      "title": "<title to get insert into>",
      "description": "<description to get insert into>",
      "status": "<status to get insert into>",
      "due_date": "<due_date to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
        "id": 1,
        "title": "<updated todos title>",
        "description": "<updated todos description>",
        "status": "<updated todos status>",
        "due_date": "<updated todos due_date>",
        "createdAt": "2021-02-20T16:08:30.149Z",
        "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:
  
  * **Code:** 400 Bad Request <br />
    **Output:** `{ msg : "<validation requirement message>" }`

  OR

  * **Code:** 404 Not Found <br />
    **Output:** `{ "msg": "To-do with id:3 not found!" }`
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:** `{ msg : "Internal Server Error" }`

* ## Sample Call:

<br />

# PATCH /todos/:id
**This route main function is updating all the record of the to-do title, description, status, and due date.**

* ## URL:

  /todos/:id

* ## Method:

  `PATCH`

*  ## URL Params

   **Required:**

   "id" = req.params.id

*  ## Request Header

   **Required:**

   ```
   {
       "Content-type": "application/json"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
        "id": 1,
        "title": "<todos title>",
        "description": "<todos description>",
        "status": "<updated todos status>",
        "due_date": "<todos due_date>",
        "createdAt": "2021-02-20T16:08:30.149Z",
        "updatedAt": "2021-02-20T16:08:30.149Z"
    }
    ```

* ## Error Response:
  
  * **Code:** 400 Bad Request <br />
    **Output:** `{ msg : "<validation requirement message>" }`

  OR

  * **Code:** 404 Not Found <br />
    **Output:** `{ "msg": "To-do with id:3 not found!" }`
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:** `{ msg : "Internal Server Error" }`

* ## Sample Call:

<br />

# DELETE /todos/:id
**This route main function is updating all the record of the to-do title, description, status, and due date.**

* ## URL:

  /todos/:id

* ## Method:

  `DELETE`

*  ## URL Params

   **Required:**

   "id" = req.params.id

*  ## Request Header

   **Required:**

   ```
   {
       "Content-type": "application/json"
   }
   ```

* ## Request Body

  **Required:**

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    { msg: 'todo success to delete'}
    ```

* ## Error Response:

  * **Code:** 404 Not Found <br />
    **Output:** `{ "msg": "To-do with id:3 not found!" }`
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:** `{ msg : "Internal Server Error" }`

* ## Sample Call:
