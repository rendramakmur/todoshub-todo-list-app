# Fancy To-Do-App Documentation

  Fancy To-Do-App is an app to manage and record what you wanna do.
  
  This API has:
  - RESTful endpoint for CRUD operations.
  - JSON formatted response.

  Tech to build this app:
  - NodeJS
  - Sequelize
  - PostgreSQL

  ## RESTful endpoints
    POST /register
    POST /login
    POST /google-login
    POST /todos
    GET /todos
    GET /todos/:id
    PUT /todos/:id
    PATCH /todos/:id
    DELETE /todos/:id
    GET /api/holidays


----

# 1. POST /register
**If you want to create new user, use this endpoint.**

* ## URL:

  /register

* ## Method:

  `POST`

*  ## URL Params

   None

*  ## Request Header

   None

* ## Request Body

  **Required:**

  ```
  {
      "first_name": "<first_name to get insert into>",
      "last_name": "<last_name to get insert into>",
      "email": "<email to get insert into>",
      "password": "<password to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 201<br/>
    **Output:**
    ```
    {
        "id": <given id by system>,
        "first_name": "<posted first_name>",
        "last_name": "<posted last_name>",
        "email": "<posted email>"
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      {
          "msg": "First Name is required"
      },
      {
          "msg": "Email is required"
      },
      {
          "msg": "Password is required"
      },
      {
          "msg": "Password length must be between 6 to 16 characters"
      },
      {
          "msg": "Must be in email format"
      }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "msg" : "Internal Server Error" }
    ```

<br />

# 2. POST /login
**This is the log in endpoint**

* ## URL:

  /login

* ## Method:

  `POST`

*  ## URL Params

   None

*  ## Request Header

   None

* ## Request Body

  **Required:**

  ```
  {
      "email": "<email to get insert into>",
      "password": "<password to get insert into>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
        access_token: <generated access token>,
        name: <user full name (first name + last name)>
    }
    ```

* ## Error Response:

  * **Code:** 400 Bad Request <br />
    **Output:** 
    ```
    [
      {
          "msg": "Email/password is invalid"
      }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "msg" : "Internal Server Error" }
    ```

<br />

# 3. POST /google-login
**This endpoint will create user if user didn't exist on database and logged in user if the user already in the database using Google OAuth2**

* ## URL:

  /google-login

* ## Method:

  `POST`

*  ## URL Params

   None

*  ## Request Header

   None

* ## Request Body

  **Required:**

  ```
  {
      "token_id": "<token_id generted by Google>"
  }
  ```

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    {
        access_token: <generated access token>,
        name: <user full name from Google Account>
    }
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "msg" : "Internal Server Error" }
    ```

<br />

# 4. POST /todos
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
       "headers": "access_token"
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
    **Output:** 
    ```
    [
      {
          "msg": "Can not set due date before present time"
      },
      {
          "msg": "Title is required"
      }
    ]
    ```

  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { "msg" : "Internal Server Error" }
    ```

<br />

# 5. GET /todos
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
       "headers": "access_token"
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
    **Output:**
    ```
    { msg : "Internal Server Error" }
    ```

<br />

# 6. GET /todos/:id
**Main function of this route is getting a spesific to-do from a user by to-do id.**

* ## URL:

  /todos/:id

* ## Method:

  `GET`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
       "headers": "access_token"
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
    **Output:** 
    ```
    { "msg": "To-do with id:3 not found!" }
    ```

<br />

# 7. PUT /todos/:id
**This route main function is updating all the record of the to-do title, description, status, and due date.**

* ## URL:

  /todos/:id

* ## Method:

  `PUT`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
       "headers": "access_token"
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
    **Output:**
    ```
    { msg : "<validation requirement message>" }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "msg": "To-do with id:3 not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { msg : "Internal Server Error" }
    ```

<br />

# 8. PATCH /todos/:id
**This route main function is updating all the record of the to-do title, description, status, and due date.**

* ## URL:

  /todos/:id

* ## Method:

  `PATCH`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
       "headers": "access_token"
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
    **Output:**
    ```
    { msg : "<validation requirement message>" }
    ```

  OR

  * **Code:** 404 Not Found <br />
    **Output:**
    ```
    { "msg": "To-do with id:3 not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { msg : "Internal Server Error" }
    ```

<br />

# 9. DELETE /todos/:id
**This route main function is updating all the record of the to-do title, description, status, and due date.**

* ## URL:

  /todos/:id

* ## Method:

  `DELETE`

*  ## URL Params

   **Required:**

   "id" = [integer]

*  ## Request Header

   **Required:**

   ```
   {
       "headers": "access_token"
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
    **Output:**
    ```
    { "msg": "To-do with id:3 not found!" }
    ```
  
  OR

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { msg : "Internal Server Error" }
    ```

<br />

# 10. DELETE /api/holidays
**This route is hitting 3rd party API and generating national holidays based on current month.**

* ## URL:

  /api/holidays

* ## Method:

  `GET`

*  ## URL Params

   None

*  ## Request Header

   None

* ## Request Body

  None

* ## Success Response:

  * **Code:** 200<br/>
    **Output:**
    ```
    [
      {
          "name": "Ascension of the Prophet Muhammad",
          "date": "2021-03-11",
          "type": "National holiday"
      },
      {
          "name": "Cuti Bersama",
          "date": "2021-03-12",
          "type": "National holiday"
      },
      {
          "name": "Bali's Day of Silence and Hindu New Year",
          "date": "2021-03-14",
          "type": "National holiday"
      }
    ]
    ```

* ## Error Response:

  * **Code:** 500 Internal Server Error <br />
    **Output:**
    ```
    { msg : "Internal Server Error" }
    ```