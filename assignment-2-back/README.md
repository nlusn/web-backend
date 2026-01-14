
# Weather & News App

A simple web application that displays current weather and related news for a given city. Built with **Node.js**, **Express**, **Axios**, and **Bootstrap**.

---

## Features

- Enter a city name to get:
  - Current temperature
  - Feels-like temperature
  - Weather description
  - Wind speed
  - Rain in the last 3 hours
  - Country code
- Display top 3 related news headlines for the city
- Responsive design with Bootstrap

---

## Project Structure

weather-news-app/  
├── public/  
│ └── index.html  
├── server.js  
├── package.json  
└── README.md


---

## Prerequisites

- [Node.js](https://nodejs.org/en/) (v14+ recommended)
- API keys:
  - [OpenWeatherMap API](https://openweathermap.org/api)
  - [NewsAPI](https://newsapi.org/)

---

## Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd weather-news-app
```

2. Install dependencies
```bash
npm install
```
3. You put your APIs into the placeholders 
```bash
const OPENWEATHER_API_KEY = "YOUR_OPENWEATHER_API_KEY";
const NEWS_API_KEY = "YOUR_NEWS_API_KEY";
```

## Installation

1. Start the server:

```bash
npm start
```

2. Go to the localhost 
```bash
http://localhost:3000
```
3. Enter a city and get its news and values about weather

## API ENDPOINT
Get /api/weather?city=<CITY_NAME>

```bash
{
  "temperature": 20,
  "feelsLike": 19,
  "description": "clear sky",
  "coordinates": { "lat": 51.51, "lon": -0.13 },
  "windSpeed": 5,
  "countryCode": "GB",
  "rainLast3h": 0,
  "news": [
    { "title": "News headline 1", "url": "https://..." },
    { "title": "News headline 2", "url": "https://..." }
  ]
}

```


## License


This project is open-source and free to use.
