# equevo-todo-api

## Getting Started

## Use POSTMAN to test all the APIs.

### Copy the token received as response after sign-in and send it along with the requestsin header or in body.

### Copy and paste the routes mentioned below in postman along with the body.

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/1AnujJoshi/equevo-todo-api.git
   ```
2. Install NPM packages
   ```sh
   npm install dotenv mongoose express
   ```

### Routes

- To Sign-In(send the email and password through body in x-www-form-urlencoded)

```sh
- POST - https://equevo-api.herokuapp.com/api/v1/signin
```

### All the APIs below are authorized with access Token.

- create todo using title and date(optional)

```sh
- POST - https://equevo-api.herokuapp.com/api/v1/create-todo
```

- update todo -pass id in params

```sh
- PATCH -https://equevo-api.herokuapp.com/api/v1/update-todo/:id
```

- get all the todo list by sending pageSize, page, fromDate, toDate

```sh
- GET - https://equevo-api.herokuapp.com/api/v1/todo
```

- To delete a todo pass id of todo in params

```sh
- DELETE - https://equevo-api.herokuapp.com/api/v1/todo/:id
```

### Hosted URL

https://equevo-api.herokuapp.com/
