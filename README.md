# Express Cart API

A backend project built with **Node.js** and **Express**. The basic CRUD operations are represented in API and stored in a JSON file

## Description

The API works with cart item objects. Each cart item has:

- **id** — unique identifier
- **name** — product name
- **price** — product price
- **amount** — quantity

Data is saved in json file `data.json`

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install 
```
3. Run the server:
```bash
npm start
```

The server will run at:

```
http://localhost:3000
```

## Demo Routes

- `GET /` — gives info that the server is running
- `GET /hello` — gets json message   
- `GET /time` — tells current time  
- `GET /status` — server status  

## Cart API

- **Get all items** — `GET /cart`  
- **Add a new item** — `POST /cart`  
- **Update an item** — `PUT /cart/:id`  
- **Delete an item** — `DELETE /cart/:id`  

## Testing

All routes were tested using Postman:

- `GET` — get all cart-items  
- `POST` — add an item  
- `PUT` — update an item  
- `DELETE` — delete an item  

## Technologies

- Node.js  
- Express  
- JSON file storage
