const CFG = require("./src/config/config");
const app = require("./src/config/app");
const express = require("express");

app.use(express.json());

const connectToMongo = require('./src/config/db');

connectToMongo();

// Basic route for testing
app.get('/', (req, res) => {
    res.send('The Backend is Running!');
});

// Start the server
app.listen(CFG.PORT, () => {
    console.log(`Server is running on http://localhost:${CFG.PORT}`);
});