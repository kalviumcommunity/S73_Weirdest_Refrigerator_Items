const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT;
const URL = process.env.URL;

app.get('/ping', (req, res) => {
    res.json({
        message: "Pong",
        status: "success",
    });
});

let flag = false;

const connectDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to DB!");
        flag = true;
    } catch (error) {
        console.error(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
};
connectDB();

app.get('/', (req, res) => {
    res.json({
        message: "Hello Welcome to ASAP Project!",
        DB_status: flag
    })
});

app.listen(PORT, () => {
    console.log(`Server running of PORT: ${PORT}`)
})