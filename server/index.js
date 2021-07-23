const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Make requests to the server at /api" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
