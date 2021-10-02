const path = require("path");
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api", (req, res) => {
    res.json({ message: "You are connected to the server" });
});

app.get("/locations/:string", (req, res) => {
    const string = req.params.string;
    fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${string}.json?access_token=${process.env.MB_KY}&cachebuster=1625641871908&autocomplete=true&types=place`
    )
        .then((response) => response.json())
        .then((data) => res.json(data));
});

app.get("/weather/:latlon", (req, res) => {
    const latlon = req.params.latlon;
    const latitude = latlon.split(",")[0];
    const longitude = latlon.split(",")[1];
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${process.env.OWM_KY}&units=imperial`
    )
        .then((response) => response.json())
        .then((data) => res.json(data));
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
