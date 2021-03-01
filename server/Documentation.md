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
* ## URL:

  /todos

* ## Method:

  `POST`

*  ## URL Params

   **Required:**

   None

* ## Data Params

  ```
  {
      "title": "<title to get insert into>",
      "description": "<description to get insert into>",
      "status": "<status to get insert into>",
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
    **Output:** `{ msg : "<validation requirement message>" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:** `{ msg : "Internal Server Error" }`

* ## Sample Call:

<br />

# GET /todos
* ## URL:

  /todos

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   None

* ## Data Params

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