
  
  
  

# Cars API

  

A RESTful API for managing cars and their reviews using **Node.js**, **Express**, and **MongoDB Atlas**. This API allows you to create, read, update, and delete cars, as well as add, view, and remove reviews for each car.

  

----------

  

## Table of Contents

  

- Features

- Tech Stack

- Installation

- Configuration

- API Endpoints

- Cars

- Reviews

- Usage

- License

  

----------

  

## Features

  

-  **CRUD operations** for cars

- Add, list, and delete reviews for cars

- Input validation with proper error handling

- Timestamps for created and updated documents

  

----------

  

## Tech Stack

  

-  **Node.js** – JavaScript runtime

-  **Express** – Web framework

-  **MongoDB Atlas** – Cloud database

-  **Mongoose** – ODM (Object Data Modeling)

-  **CORS** – Cross-Origin Resource Sharing

  

----------

  

## Installation

  

1. Clone the repository:

  

```bash
git  clone  https://github.com/nlusn/web-backend
cd  assignment-3-back
```

  

2. Install dependencies:

  

```bash 
npm  install
```

  

3. Start the server:

  

```bash
npm  start
```

  

> The server will run on `http://localhost:3000`

  

----------

  

## Configuration

  

The app uses **MongoDB Atlas** for the database. Update the connection string in the code

  

PS: paste your db_username and db_password into the prompts

  

```javascript
mongoose.connect(
'mongodb+srv://<db_username>:<db_password>@cluster0.ugbvokq.mongodb.net/?appName=Cluster0'
)
```

  

- Replace `<db_username>` and `<db_password>` with your MongoDB Atlas credentials.

- Make sure to solve the problem with whitelisting you may solve by allowing connections from your IP or all IPs (0.0.0.0/0).

  

----------

  

## API Endpoints

  

### Cars

  

GET

  

`/`

  
  

API status message

  

---

POST

  

`/cars`

  

Create a new car

  

---

GET (all items)

`/cars`

  

Get all cars

  

---

GET (specific item)

  

`/cars/:id`

  

Get a single car by ID

  

PUT

  

`/cars/:id`

  

Update a car by ID

  

DELETE

  

`/cars/:id`

  

Delete a car by ID

  

**POST /cars Example Body:**

  

```json

{

"name": "Model S",

"brand": "Tesla",

"price": 80000,

"year": 2021

}

  

```

  

----------

  

### Reviews

  

POST

  

`/cars/:id/reviews`

  

Add a review to a car

  

---

GET

  

`/cars/:id/reviews`

  

Get all reviews for a car

  

---

DELETE

  

`/reviews/:id`

  

Delete a review by review ID

  

---

**POST /cars/:id/reviews Example Body:**

  

```json

{

"author": "John Doe",

"rating": 5,

"comment": "Excellent car!"

}

  

```

  

----------

  

## Usage

  
  

1. Start the server:

  

```bash
npm start
```

  

2. Use **Postman** to test the API endpoints.

3. The API returns JSON responses and appropriate HTTP status codes for success and errors.

  

----------

  

## License

  

This project is licensed under the MIT License.

  

----------