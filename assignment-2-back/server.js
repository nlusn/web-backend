//Import modules
const express = require("express");
const axios = require("axios");

//Create server
const app = express();
const PORT = 3000;

//Storing weather and news api in the variables
const OPENWEATHER_API_KEY = "d7784113ef29e6690086ebaca882dd50";
const NEWS_API_KEY = "2d733a406989445089768af3427b07c7";

//Serve static files from "public" folder
app.use(express.json()); // parse JSON if needed
app.use(express.static("public")); // serve index.html automatically

//API endpoint for weather + news
app.get("/api/weather", async (req, res) => {
  const city = req.query.city; // get city from URL: /api/weather?city=London
  if (!city) return res.status(400).json({ error: "City required" });

  try {
    // Call OpenWeather API
    const weatherRes = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          units: "metric",
          appid: OPENWEATHER_API_KEY,
        },
      }
    );

    const w = weatherRes.data;

    // Call News API
    const newsRes = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        q: city,
        apiKey: NEWS_API_KEY,
        pageSize: 3,
      },
    });

    // Preparing JSON to send to frontend
    res.json({
      temperature: w.main.temp,
      feelsLike: w.main.feels_like,
      description: w.weather[0].description,
      coordinates: w.coord,
      windSpeed: w.wind.speed,
      countryCode: w.sys.country,
      rainLast3h: w.rain?.["3h"] ?? 0,
      news: newsRes.data.articles.map((a) => ({
        title: a.title,
        url: a.url,
      })),
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

//Start server
app.listen(PORT, () =>
  console.log(`Server running → http://localhost:${PORT}`)
);

