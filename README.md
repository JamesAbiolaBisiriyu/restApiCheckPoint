JAMES ABIOLA BISIRIYU
# REST API Checkpoint

This project is a simple REST API built with **Node.js**, **Express**, **Mongoose**, and **MongoDB**.
It was created as a checkpoint exercise to practice building CRUD endpoints and connecting a server to a database.

## What the API Does

The API manages users in a MongoDB collection. Each user has:

- `name`
- `email`
- `age`

The server supports the following CRUD operations:

- `GET /users` - return all users
- `POST /users` - create a new user
- `PUT /users/:id` - update a user by ID
- `DELETE /users/:id` - delete a user by ID

## Project Structure

```text
restApiCheckpoint/
  config/
    .env
  models/
    User.js
  server.js
  package.json
  README.md
```

## Setup

1. Install dependencies

```bash
npm install
```

2. Start MongoDB locally

Make sure MongoDB is running on your machine at `mongodb://127.0.0.1:27017`.

3. Run the application

```bash
npm run dev
```

The server will start on the port defined in `config/.env`.

## Environment Variables

The application reads its configuration from `config/.env`.

Example:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/rest_api_checkpoint
```

## Testing with Postman

Use Postman to test each route:

### Get all users

`GET http://localhost:3000/users`

### Create a user

`POST http://localhost:3000/users`

Body example:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 22
}
```

### Update a user

`PUT http://localhost:3000/users/:id`

### Delete a user

`DELETE http://localhost:3000/users/:id`

## Notes

- The code includes comments to explain the main parts of the API.
- `nodemon` is used for development so the server restarts automatically when files change.
- `node server.js` is available for a standard production-style start command.
